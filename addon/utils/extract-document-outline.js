import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import ModelNodeUtils from '@lblod/ember-rdfa-editor/model/util/model-node-utils';
import dataFactory from '@rdfjs/data-model';

export default function extractOutline(controller, node, config) {
  let result = [];

  if (ModelNode.isModelElement(node)) {
    let parent;
    const attributes = node.getRdfaAttributes();
    if (attributes.properties) {
      for (const tocConfigEntry of config) {
        if (attributes.properties.includes(tocConfigEntry.sectionPredicate)) {
          if (typeof tocConfigEntry.value === 'string') {
            parent = { content: tocConfigEntry.value, node };
            break;
          } else {
            const nodes = [
              ...controller.datastore
                .match(
                  `>${attributes.resource}`,
                  dataFactory.namedNode(tocConfigEntry.value.predicate)
                )
                .asObjectNodeMapping()
                .nodes(),
            ];
            if (nodes.length) {
              parent = {
                content: ModelNodeUtils.getTextContent(nodes[0]),
                node,
              };
              break;
            }
          }
        }
      }
    }
    const subResults = [];
    node.children.forEach((child) => {
      subResults.push(...extractOutline(controller, child, config));
    });
    if (parent) {
      parent.children = subResults;
      result = [parent];
    } else {
      result = subResults;
    }
  }
  return result;
}

import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import { tracked } from '@glimmer/tracking';
import ModelNodeUtils from '@lblod/ember-rdfa-editor/model/util/model-node-utils';
import { action } from '@ember/object';
import { DEFAULT_CONFIG } from '@lblod/ember-rdfa-editor-table-of-contents-plugin/utils/default_config';
import Component from '@glimmer/component';

export default class TableOfContentsComponent extends Component {
  @tracked
  documentOutline;

  constructor(owner, args) {
    super(owner, args);
    this.update();

    this.args.editorController.onEvent(
      'contentChanged',
      this.update.bind(this)
    );
    this.args.editorController.onEvent('modelRead', this.update.bind(this));
  }

  get config() {
    return this.args.componentController.props.config
      ? this.args.componentController.props.config
      : DEFAULT_CONFIG;
  }

  willDestroy() {
    this.args.editorController.offEvent(
      'contentChanged',
      this.update.bind(this)
    );
    this.args.editorController.offEvent('modelRead', this.update.bind(this));
    super.willDestroy();
  }

  update() {
    const outline = {
      entries: this.extractOutline(this.args.editorController.modelRoot),
    };
    this.documentOutline = outline;
  }

  extractOutline(node) {
    let result = [];

    if (ModelNode.isModelElement(node)) {
      let parent;
      const attributes = node.getRdfaAttributes();
      if (attributes.properties) {
        for (const tocConfigEntry of this.config) {
          if (attributes.properties.includes(tocConfigEntry.sectionPredicate)) {
            if (typeof tocConfigEntry.value === 'string') {
              parent = { content: tocConfigEntry.value, node };
              break;
            } else {
              const nodes = [
                ...this.args.editorController.datastore
                  .match(
                    `>${attributes.resource}`,
                    tocConfigEntry.value.predicate
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
        subResults.push(...this.extractOutline(child));
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

  @action
  moveToSection(node) {
    console.log('moveToSection');
    const range = this.args.editorController.rangeFactory.fromInNode(node, 0);
    this.args.editorController.selection.selectRange(range);
    this.args.editorController.write(true, true);
  }
}

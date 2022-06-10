import InlineComponent, {
  InlineComponentArgs,
} from '@lblod/ember-rdfa-editor/components/inline-components/inline-component';
import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import { tracked } from '@glimmer/tracking';
import ModelNodeUtils from '@lblod/ember-rdfa-editor/model/util/model-node-utils';
import ModelRange from '@lblod/ember-rdfa-editor/model/model-range';
import ModelPosition from '@lblod/ember-rdfa-editor/model/model-position';
import { action } from '@ember/object';
// import '@lblod/ember-rdfa-editor/types/lblod/marawa/rdfa-attributes';
import RdfaAttributes from '@lblod/marawa/rdfa-attributes';
interface DocumentOutline {
  entries: OutlineEntry[];
}

export interface OutlineEntry {
  content: string;
  node: ModelNode;
  children?: OutlineEntry[];
}
export default class TableOfContentsComponent extends InlineComponent {
  @tracked
  documentOutline: DocumentOutline | undefined;

  constructor(owner: unknown, args: InlineComponentArgs) {
    super(owner, args);
    const outline: DocumentOutline = {
      entries: this.extractOutline(this.args.controller.modelRoot),
    };
    this.documentOutline = outline;

    this.args.controller.onEvent('contentChanged', this.update.bind(this));
    this.args.controller.onEvent('modelRead', this.update.bind(this));
  }

  willDestroy(): void {
    console.log('destroy');
    this.args.controller.offEvent('contentChanged', this.update.bind(this));
    this.args.controller.offEvent('modelRead', this.update.bind(this));
  }

  update() {
    const outline: DocumentOutline = {
      entries: this.extractOutline(this.args.controller.modelRoot),
    };
    this.documentOutline = outline;
  }

  extractTitle(node: ModelNode): ModelNode | null {
    if (ModelNode.isModelElement(node)) {
      const attributes: RdfaAttributes = node.getRdfaAttributes();
      if (
        attributes['properties'] &&
        attributes['properties'].includes(
          'http://data.europa.eu/eli/ontology#title'
        )
      ) {
        return node;
      }
      let result = null;
      node.children.forEach((child) => {
        const val = this.extractTitle(child);
        if (val) {
          result = val;
          return;
        }
      });
      return result;
    }
    return null;
  }

  extractOutline(node: ModelNode): OutlineEntry[] {
    let result: OutlineEntry[] = [];

    if (ModelNode.isModelElement(node)) {
      let parent: OutlineEntry | undefined;
      const attributes: RdfaAttributes = node.getRdfaAttributes();
      console.log(attributes.properties);
      if (attributes.properties) {
        if (
          attributes.properties.includes(
            'http://data.europa.eu/eli/ontology#has_part'
          )
        ) {
          const nodes = [
            ...this.args.controller.datastore
              .match(`>${attributes.resource}`, `eli:number`)
              .asObjectNodeMapping()
              .nodes(),
          ];
          if (nodes.length) {
            console.log(ModelNodeUtils.getTextContent(nodes[0]));
            parent = { content: ModelNodeUtils.getTextContent(nodes[0]), node };
          }
        } else if (attributes.properties.includes('ext:hasParagraph')) {
          parent = { content: '§', node };
        }
      }
      const subResults: OutlineEntry[] = [];
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
  moveToSection(node: ModelNode) {
    console.log('moveToSection');
    const range = new ModelRange(ModelPosition.fromInNode(node, 0));
    this.args.controller.selection.selectRange(range);
    this.args.controller.write(true, true);
  }
}

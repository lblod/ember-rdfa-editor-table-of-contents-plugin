import InlineComponent, {
  InlineComponentArgs,
} from '@lblod/ember-rdfa-editor/components/inline-components/inline-component';
import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import { tracked } from '@glimmer/tracking';
import ModelNodeUtils from '@lblod/ember-rdfa-editor/model/util/model-node-utils';
import ModelRange from '@lblod/ember-rdfa-editor/model/model-range';
import ModelPosition from '@lblod/ember-rdfa-editor/model/model-position';
import { action } from '@ember/object';
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
    const node = this.extractTitle(this.args.controller.modelRoot);
    if (node) {
      this.documentOutline = {
        entries: [{ node, content: ModelNodeUtils.getTextContent(node) }],
      };
    }

    this.args.controller.onEvent('contentChanged', this.update.bind(this));
  }

  willDestroy(): void {
    console.log('destroy');
    this.args.controller.offEvent('contentChanged', this.update.bind(this));
  }

  update() {
    const node = this.extractTitle(this.args.controller.modelRoot);
    if (node) {
      this.documentOutline = {
        entries: [{ node, content: ModelNodeUtils.getTextContent(node) }],
      };
    }
  }

  extractRdfaOutline(
    node: ModelNode
  ): { content?: object; children?: object[] }[] {
    if (ModelNode.isModelElement(node)) {
      const attributes: object = node.getRdfaAttributes() as object;
      let hasRdfaAttributes = false;
      for (const k in attributes) {
        if (k !== 'currentPrefixes') {
          const val = attributes[k];
          if (val) {
            hasRdfaAttributes = true;
            break;
          }
        }
      }
      if (hasRdfaAttributes) {
        if (attributes['properties'].length) {
          console.log(node);
          console.log(ModelNodeUtils.getTextContent(node));
        }
        const rdfaContent = {
          content: attributes,
          children: node.children.flatMap((child) => this.extractTitle(child)),
        };
        return [rdfaContent];
      } else {
        return node.children.flatMap((child) => this.extractTitle(child));
      }
    }
    return [];
  }

  extractTitle(node: ModelNode): ModelNode | null {
    if (ModelNode.isModelElement(node)) {
      const attributes: object = node.getRdfaAttributes() as object;
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

  @action
  moveToSection(node: ModelNode) {
    console.log('moveToSection');
    const range = new ModelRange(ModelPosition.fromInNode(node, 0));
    this.args.controller.selection.selectRange(range);
    this.args.controller.write();
  }
}

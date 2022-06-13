import InlineComponent, {
  InlineComponentArgs,
} from '@lblod/ember-rdfa-editor/components/inline-components/inline-component';
import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import { tracked } from '@glimmer/tracking';
import ModelNodeUtils from '@lblod/ember-rdfa-editor/model/util/model-node-utils';
import { action } from '@ember/object';
// import '@lblod/ember-rdfa-editor/types/lblod/marawa/rdfa-attributes';
import RdfaAttributes from '@lblod/marawa/rdfa-attributes';
import { TOC_CONFIG } from '@lblod/ember-rdfa-table-of-contents-plugin/utils/toc_config';
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
    this.update();

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

  @action
  remove() {
    this.args.controller.executeCommand('remove-component', this.args.model);
  }

  extractOutline(node: ModelNode): OutlineEntry[] {
    let result: OutlineEntry[] = [];

    if (ModelNode.isModelElement(node)) {
      let parent: OutlineEntry | undefined;
      const attributes: RdfaAttributes = node.getRdfaAttributes();
      if (attributes.properties) {
        for (const tocConfigEntry of TOC_CONFIG) {
          if (attributes.properties.includes(tocConfigEntry.sectionPredicate)) {
            if (typeof tocConfigEntry.value === 'string') {
              parent = { content: tocConfigEntry.value, node };
              break;
            } else {
              const nodes = [
                ...this.args.controller.datastore
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
      const subResults: OutlineEntry[] = [];
      node.children.forEach((child: ModelNode) => {
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
    const range = this.args.controller.rangeFactory.fromInNode(node, 0);
    this.args.controller.selection.selectRange(range);
    this.args.controller.write(true, true);
  }
}

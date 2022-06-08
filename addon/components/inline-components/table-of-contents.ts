import InlineComponent, {
  InlineComponentArgs,
} from '@lblod/ember-rdfa-editor/components/inline-components/inline-component';
import ModelNode from '@lblod/ember-rdfa-editor/model/model-node';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
interface DocumentOutline {
  entries: OutlineEntry[];
}

export interface OutlineEntry {
  content: string;
  children?: OutlineEntry[];
}
export default class TableOfContentsComponent extends InlineComponent {
  @tracked
  documentOutline: DocumentOutline;

  get numberOfUpdates(): number {
    return (this.getStateProperty('numberOfUpdates') as number) || 0;
  }

  constructor(owner: unknown, args: InlineComponentArgs) {
    super(owner, args);
    this.documentOutline = this.getDocumentOutlineDummy();

    this.args.controller.onEvent('contentChanged', this.update.bind(this));
  }

  willDestroy(): void {
    console.log('destroy');
    this.args.controller.offEvent('contentChanged', this.update.bind(this));
  }

  update() {
    console.log((this.getStateProperty('numberOfUpdates') as number) || 0);
    const newVal = this.numberOfUpdates + 1;
    this.setStateProperty('numberOfUpdates', newVal);
    this.documentOutline = this.getDocumentOutlineDummy();
  }

  getDocumentOutlineDummy(): DocumentOutline {
    return {
      entries: [
        {
          content: `Title 1`,
          children: [
            {
              content: 'Subtitle 1',
            },
            {
              content: 'Subtitle 2',
            },
          ],
        },
        {
          content: 'Title 2',
          children: [
            {
              content: 'Subtitle 3',
            },
            {
              content: 'Subtitle 4',
            },
          ],
        },
      ],
    };
  }

  extractTitle(node: ModelNode): object {
    if (ModelNode.isModelElement(node)) {
      const rdfaContent = {
        content: node.getRdfaAttributes(),
        children: node.children.map((child) => this.extractTitle(child)),
      };
      // const prefixes = node.getRdfaAttributes();
      // console.log(prefixes);
      // node.children.forEach((child) => {
      //   this.extractTitle(child);
      // });
      return rdfaContent;
    }
    return {};
  }
}

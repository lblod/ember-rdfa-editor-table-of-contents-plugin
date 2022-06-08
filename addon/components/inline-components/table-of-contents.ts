import InlineComponent from '@lblod/ember-rdfa-editor/components/inline-components/inline-component';

interface DocumentOutline {
  entries: OutlineEntry[];
}

export interface OutlineEntry {
  content: string;
  children?: OutlineEntry[];
}
export default class TableOfContentsComponent extends InlineComponent {
  get documentOutlineDummy(): DocumentOutline {
    return {
      entries: [
        {
          content: 'Title 1',
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
}

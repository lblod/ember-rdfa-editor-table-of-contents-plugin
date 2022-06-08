import {
  InlineComponentSpec,
  Properties,
} from '@lblod/ember-rdfa-editor/model/inline-components/model-inline-component';

export default class TableOfContentsSpec extends InlineComponentSpec {
  _renderStatic(_props?: Properties): string {
    return `
      <p>Table of Contents</p>
    `;
  }
  constructor() {
    super('inline-components/table-of-contents', 'div');
  }
}

import { InlineComponentSpec } from '@lblod/ember-rdfa-editor/model/inline-components/model-inline-component';
import { isElement } from '@lblod/ember-rdfa-editor/utils/dom-helpers';
export default class TableOfContentsSpec extends InlineComponentSpec {
  matcher = {
    tag: this.tag,
    attributeBuilder: (node) => {
      if (isElement(node)) {
        if (
          node.classList.contains('inline-component') &&
          node.classList.contains(this.name)
        ) {
          return {};
        }
      }
      return null;
    },
  };
  _renderStatic() {
    return `
      <p>Table of Contents</p>
    `;
  }
  constructor(controller) {
    super('inline-components/table-of-contents', 'div', controller);
  }
}

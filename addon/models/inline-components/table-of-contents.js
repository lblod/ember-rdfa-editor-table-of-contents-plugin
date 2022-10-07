import extractOutline from '@lblod/ember-rdfa-editor-table-of-contents-plugin/utils/extract-document-outline';
import { InlineComponentSpec } from '@lblod/ember-rdfa-editor/model/inline-components/model-inline-component';
import { isElement } from '@lblod/ember-rdfa-editor/utils/dom-helpers';
import { tableOfContentsStatic } from './table-of-contents-static';
import { DEFAULT_CONFIG } from '@lblod/ember-rdfa-editor-table-of-contents-plugin/utils/default_config';

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
  _renderStatic(props) {
    const config = props.config ?? DEFAULT_CONFIG;
    const outline = {
      entries: extractOutline(
        this.controller,
        this.controller.modelRoot,
        config
      ),
    };
    console.log('OUTLINE: ', outline);
    // TODO: should be implemented when static version of inline components work correctly
    return tableOfContentsStatic(
      {
        outline,
      },
      {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      }
    );
  }
  constructor(controller) {
    super('inline-components/table-of-contents', 'div', controller);
  }
}

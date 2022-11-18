import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class ApplicationController extends Controller {
  plugins = [
    // 'rdfa-toc',
    { name: 'rdfa-toc', options: { config: this.tableOfContentsConfig } },
    'article-structure',
  ];

  get tableOfContentsConfig() {
    return [
      {
        sectionPredicate: 'https://say.data.gift/ns/hasPart',
        value: {
          predicate: 'https://say.data.gift/ns/heading',
        },
      },
      {
        sectionPredicate: 'https://say.data.gift/ns/hasParagraph',
        value: '§',
      },
    ];
  }

  @action
  rdfaEditorInit(controller) {
    controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents',
      {
        config: this.tableOfContentsConfig,
      },
      false
    );
    controller.executeCommand(
      'insert-html',
      `
      <div prefix="dct: http://purl.org/dc/terms/ ext: http://mu.semte.ch/vocabularies/ext/ say: https://say.data.gift/ns/ prov: http://www.w3.org/ns/prov#" typeof="https://say.data.gift/ns/DocumentContent">
        Insert here
      </div>`
    );
  }
}

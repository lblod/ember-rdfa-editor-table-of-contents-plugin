# ember-rdfa-editor-table-of-contents-plugin

This plugin implements an auto-refreshing table of contents using an inline component.
A table of contents with a custom config can be inserted into the editor using:

```js
import dataFactory from '@rdfjs/data-model'

controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents',
      {
        config: [
          {
            sectionPredicate: dataFactory.namedNode('https://say.data.gift/ns/hasPart'),
            value: {
              predicate: dataFactory.namedNode('https://say.data.gift/ns/heading'),
            },
          },
          {
            sectionPredicate: dataFactory.namedNode('https://say.data.gift/ns/hasParagraph'),
            value: '§',
          },
        ],
      },
      {},
      false
    );
```

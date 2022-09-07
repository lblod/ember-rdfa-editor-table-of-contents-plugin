# ember-rdfa-editor-table-of-contents-plugin

This plugin implements an auto-refreshing table of contents using an inline component.
A table of contents with a custom config can be inserted into the editor using:

```js
controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents',
      {
        config: [
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
        ],
      },
      {},
      false
    );
```

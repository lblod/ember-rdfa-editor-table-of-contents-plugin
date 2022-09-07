# ember-rdfa-editor-table-of-contents-plugin

This plugin implements an auto-refreshing table of contents using an ember-rdfa-editor inline component.

## How to configure the plugin

In order to enable the plugin you need to add 'rdfa-toc' to the list of plugins passed to the rdfa-editor.
You can configure the plugin with a custom table of contents configuration like this:
```js
plugins = [
  { name: 'rdfa-toc', 
    options: { 
      config: {
        sectionPredicate: 'https://say.data.gift/ns/hasPart',
        value: {
          predicate: 'https://say.data.gift/ns/heading',
        },
      },
      {
        sectionPredicate: 'https://say.data.gift/ns/hasParagraph',
        value: '§',
      }, 
    } 
  },
]
```
A table of contents component instance with a custom config can be inserted into the editor using:

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

The dummy application of this plugin contains a working example with custom configuration.


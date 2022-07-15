# ember-rdfa-editor-table-of-contents-plugin

This plugin implements an auto-refreshing table of contents using an inline component.
A table of contents with a custom config can be inserted into the editor using:

```
controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents',
      {
        config: [
          {
            sectionPredicate: 'say:hasPart',
            value: {
              predicate: 'say:heading',
            },
          },
          {
            sectionPredicate: 'ext:hasParagraph',
            value: '§',
          },
        ],
      },
      {},
      false
    );
```

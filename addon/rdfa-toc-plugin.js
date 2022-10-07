import TableOfContentsSpec from './models/inline-components/table-of-contents';

export default class RdfaTocPlugin {
  get name() {
    return 'rdfa-toc';
  }

  initialize(transaction, controller, options) {
    transaction.registerInlineComponent(new TableOfContentsSpec(controller));
    const widgetArgs = options?.config
      ? {
          config: options.config,
        }
      : {};
    transaction.registerWidget(
      {
        componentName: 'table-of-contents-card',
        identifier: 'table-of-contents-plugin/card',
        desiredLocation: 'sidebar',
        widgetArgs,
      },
      controller
    );
  }
}

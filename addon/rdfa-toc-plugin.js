import TableOfContentsSpec from './models/inline-components/table-of-contents';

export default class RdfaTocPlugin {
  controller;

  get name() {
    return 'rdfa-toc';
  }

  initialize(controller, options) {
    this.controller = controller;
    controller.registerInlineComponent(
      new TableOfContentsSpec(this.controller)
    );
    controller.registerWidget({
      componentName: 'table-of-contents-card',
      identifier: 'table-of-contents-plugin/card',
      desiredLocation: 'sidebar',
      widgetArgs: {
        config: options.config,
      },
    });
  }
}

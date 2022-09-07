import TableOfContentsSpec from './models/inline-components/table-of-contents';

export default class RdfaTocSamplePlugin {
  controller;

  get name() {
    return 'rdfa-ic-sample';
  }

  initialize(controller) {
    this.controller = controller;
    controller.registerInlineComponent(
      new TableOfContentsSpec(this.controller)
    );
    controller.registerWidget({
      componentName: 'table-of-contents-card',
      identifier: 'table-of-contents-plugin/card',
      desiredLocation: 'sidebar',
    });
  }
}

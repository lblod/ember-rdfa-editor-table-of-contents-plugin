import Controller from '@lblod/ember-rdfa-editor/model/controller';
import TableOfContentsSpec from './models/inline-components/table-of-contents';

export default class RdfaTocSamplePlugin {
  controller!: Controller;

  get name() {
    return 'rdfa-ic-sample';
  }

  initialize(controller: Controller) {
    this.controller = controller;
    controller.registerWidget({
      componentName: 'rdfa-toc-plugin-insert',
      identifier: 'rdfa-toc-plugin/insert',
      desiredLocation: 'insertSidebar',
    });
    controller.registerInlineComponent(
      new TableOfContentsSpec(this.controller)
    );
  }
}

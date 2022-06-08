import Controller from '@lblod/ember-rdfa-editor/model/controller';
import TableOfContentsSpec from './models/inline-components/table-of-contents';

export default class RdfaIcSamplePlugin {
  controller!: Controller;

  get name() {
    return 'rdfa-ic-sample';
  }

  initialize(controller: Controller) {
    this.controller = controller;
    controller.registerWidget({
      componentName: 'rdfa-ic-plugin-insert',
      identifier: 'rdfa-ic-plugin/insert',
      desiredLocation: 'insertSidebar',
    });
    controller.registerInlineComponent(new TableOfContentsSpec());
  }

  // modelWrittenHandler(event) {
  //   if (event.owner !== this.name) {
  //     //TODO implement automatically date recognition and insertion
  //   }
  // }
}

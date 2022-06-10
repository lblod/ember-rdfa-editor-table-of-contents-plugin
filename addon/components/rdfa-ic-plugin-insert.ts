import { action } from '@ember/object';
import Component from '@glimmer/component';
import Controller from '@lblod/ember-rdfa-editor/model/controller';

interface Args {
  controller: Controller;
}
export default class RdfaIcPluginInsertComponent extends Component<Args> {
  @action
  insertTableOfContents() {
    this.args.controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents'
    );
  }
}

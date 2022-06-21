import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RdfaIcPluginInsertComponent extends Component {
  @action
  insertTableOfContents() {
    this.args.controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents'
    );
  }
}

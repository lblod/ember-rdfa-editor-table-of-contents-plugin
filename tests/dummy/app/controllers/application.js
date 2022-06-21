import Controller from '@ember/controller';
import { action } from '@ember/object';
import sampleData from '../config/sample-data';
export default class ApplicationController extends Controller {
  plugins = ['rdfa-toc', 'article-structure', 'besluit'];

  @action
  rdfaEditorInit(controller) {
    controller.executeCommand(
      'insert-component',
      'inline-components/table-of-contents',
      {},
      {},
      false
    );
    controller.executeCommand('insert-html', sampleData['DecisionTemplate']);
  }
}

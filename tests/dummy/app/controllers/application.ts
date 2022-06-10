import Controller from '@ember/controller';
import { action } from '@ember/object';
import EditorController from '@lblod/ember-rdfa-editor/model/controller';
import sampleData from '@lblod/ember-rdfa-editor/config/sample-data';
export default class ApplicationController extends Controller {
  plugins = ['rdfa-toc', 'article-structure', 'besluit'];

  @action
  rdfaEditorInit(controller: EditorController): void {
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

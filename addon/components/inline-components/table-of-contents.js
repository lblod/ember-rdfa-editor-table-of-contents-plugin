import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DEFAULT_CONFIG } from '@lblod/ember-rdfa-editor-table-of-contents-plugin/utils/default_config';
import Component from '@glimmer/component';
import extractOutline from '@lblod/ember-rdfa-editor-table-of-contents-plugin/utils/extract-document-outline';
export default class TableOfContentsComponent extends Component {
  @tracked
  documentOutline;

  constructor(owner, args) {
    super(owner, args);
    this.update();

    this.args.editorController.onEvent(
      'contentChanged',
      this.update.bind(this)
    );
    this.args.editorController.onEvent('modelRead', this.update.bind(this));
  }

  get config() {
    return this.args.componentController.props.config
      ? this.args.componentController.props.config
      : DEFAULT_CONFIG;
  }

  willDestroy() {
    this.args.editorController.offEvent(
      'contentChanged',
      this.update.bind(this)
    );
    this.args.editorController.offEvent('modelRead', this.update.bind(this));
    super.willDestroy();
  }

  update() {
    const outline = {
      entries: extractOutline(
        this.args.editorController,
        this.args.editorController.modelRoot,
        this.config
      ),
    };
    this.documentOutline = outline;
  }

  @action
  moveToSection(node) {
    console.log('moveToSection');
    const range = this.args.editorController.rangeFactory.fromInNode(node, 0);
    this.args.editorController.selection.selectRange(range);
    this.args.editorController.write(true, true);
  }
}

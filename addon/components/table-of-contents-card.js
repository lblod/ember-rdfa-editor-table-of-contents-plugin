import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TableOfContentsCardComponent extends Component {
  @tracked toggled;

  constructor() {
    super(...arguments);
    this.toggled = this.tableOfContentsInstances.length !== 0;
    this.args.controller.addTransactionDispatchListener(() => {
      this.toggled = this.tableOfContentsInstances.length !== 0;
    });
  }

  get tableOfContentsInstances() {
    return this.args.controller.getComponentInstances({
      componentName: 'inline-components/table-of-contents',
    });
  }

  get tableOfContentsProps() {
    return this.args.widgetArgs.config
      ? { config: this.args.widgetArgs.config }
      : {};
  }

  @action
  toggle() {
    if (this.toggled) {
      // Remove instances from table of contents
      this.args.controller.perform((tr) => {
        this.tableOfContentsInstances.forEach((instance) => {
          console.log('INSTANCE: ', instance);
          const model = instance.componentController.model;
          tr.commands.removeComponent({
            component: model,
          });
        });
      });
    } else {
      // Add table of contents
      this.args.controller.perform((tr) => {
        tr.commands.insertComponent({
          componentName: 'inline-components/table-of-contents',
          props: this.tableOfContentsProps,
          createSnapshot: false,
          range: tr.rangeFactory.fromInElement(tr.currentDocument, 0, 0),
        });
      });
    }
  }
}

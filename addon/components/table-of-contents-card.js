import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class TableOfContentsCardComponent extends Component {
  get tableOfContentsInstances() {
    return this.args.controller.getComponentInstances({
      componentName: 'inline-components/table-of-contents',
    });
  }

  get toggled() {
    return this.tableOfContentsInstances.length !== 0;
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
      this.tableOfContentsInstances.forEach((instance) => {
        const model = instance.componentController.model;
        this.args.controller.executeCommand('remove-component', model);
      });
    } else {
      // Add table of contents
      console.log(this.tableOfContentsProps);
      this.args.controller.executeCommand(
        'insert-component',
        'inline-components/table-of-contents',
        this.tableOfContentsProps,
        {},
        false,
        this.args.controller.rangeFactory.fromInElement(
          this.args.controller.modelRoot,
          0,
          0
        )
      );
    }
  }
}

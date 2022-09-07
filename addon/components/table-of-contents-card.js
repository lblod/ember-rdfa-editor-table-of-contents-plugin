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

  @action
  toggle() {
    if (this.toggled) {
      // Remove instances from table of contents
      this.tableOfContentsInstances.forEach((instance) => {
        const model = instance.componentController.model;
        this.args.controller.executeCommand('remove-component', model);
      });
      console.log(this.args.controller.modelRoot);
    } else {
      // Add table of contents
      this.args.controller.executeCommand(
        'insert-component',
        'inline-components/table-of-contents',
        {},
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

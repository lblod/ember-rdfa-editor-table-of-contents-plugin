import Component from '@glimmer/component';
import { OutlineEntry } from './table-of-contents';

interface InlineComponentsOutlineArgs {
  entries: OutlineEntry[];
}

export default class InlineComponentsOutline extends Component<InlineComponentsOutlineArgs> {}

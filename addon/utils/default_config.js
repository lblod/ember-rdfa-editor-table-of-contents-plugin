import { SAY } from './namespaces';

export const DEFAULT_CONFIG = [
  {
    sectionPredicate: SAY('hasPart'),
    value: {
      predicate: SAY('heading'),
    },
  },
  {
    sectionPredicate: SAY('hasParagraph'),
    value: '§',
  },
];

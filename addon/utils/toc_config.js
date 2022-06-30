export const TOC_CONFIG = [
  {
    sectionPredicate: 'http://data.europa.eu/eli/ontology#has_part',
    value: {
      predicate: 'eli:number',
    },
  },
  {
    sectionPredicate: 'say:hasPart',
    value: {
      predicate: 'say:heading',
    },
  },
  {
    sectionPredicate: 'ext:hasParagraph',
    value: '§',
  },
];

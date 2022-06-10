type TableOfContentsEntryConfig = {
  sectionPredicate: string;
  value: string | { predicate: string };
};

export const TOC_CONFIG: TableOfContentsEntryConfig[] = [
  {
    sectionPredicate: 'http://data.europa.eu/eli/ontology#has_part',
    value: {
      predicate: 'eli:number',
    },
  },
  {
    sectionPredicate: 'ext:hasStructure',
    value: {
      predicate: '>dct:title',
    },
  },
  {
    sectionPredicate: 'ext:hasParagraph',
    value: '§',
  },
];

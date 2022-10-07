import Handlebars from 'handlebars';

Handlebars.registerPartial(
  'outline',
  `
  <ul>
    {{#each entries}}
      <li>
        {{this.content}}
        {{#if this.children}}
          {{> outline entries=this.children}}
        {{/if}}
      </li>
    {{/each}}
  </ul>
  `
);

export const tableOfContentsStatic = Handlebars.compile(`
  <div class='table-of-contents'>
    <h3>Table of Contents</h3>
    {{#if outline}}
      {{> outline entries=outline.entries}}
    {{/if}}
  </div>
`);

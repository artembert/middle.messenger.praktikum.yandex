export const navigationPageTemplate = `
<div class="navigation-page">
  {{#each routes}}
    <a href="{{this}}">
      {{this}}
    </a>
  {{/each}}
</div>
`;
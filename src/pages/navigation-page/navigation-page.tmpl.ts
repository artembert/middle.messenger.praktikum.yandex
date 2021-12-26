export const navigationPageTemplate = `
<div class="navigation-page">
  <div class="navigation-page__title title">
    Страницы
  </div>
  <div class="navigation-page__links">
    {{#each routes}}
      {{> app-link href=this mode="link" text=this }}
    {{/each}}
  </div>
</div>
`;
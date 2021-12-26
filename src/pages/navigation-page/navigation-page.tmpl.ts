export const navigationPageTemplate = `
<main class="navigation-page">
  <h1 class="navigation-page__title title">
    Страницы
  </h1>
  <div class="navigation-page__links">
    {{#each routes}}
      {{> app-link href=this mode="link" text=this }}
    {{/each}}
  </div>
</div>
`;
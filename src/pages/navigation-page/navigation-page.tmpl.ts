export const navigationPageTemplate = `
<main class="navigation-page">
  <h1 class="navigation-page__title title">
    Страницы
  </h1>
  <nav>
  <ul class="navigation-page__links">
    {{#each routes}}
      <li>
        {{> app-link href=this mode="link" text=this }}
      </li>
    {{/each}}
  </div>
  </nav>
</div>
`;
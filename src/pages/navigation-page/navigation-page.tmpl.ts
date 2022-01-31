export const navigationPageTemplate = `
<main class="navigation-page">
  <h1 class="navigation-page__title title">
    Страницы
  </h1>
  <nav>
    <ul class="navigation-page__links">
      {{#each routes}}
        <li>
          <a href={{this}}>{{this}}</a>
        </li>
      {{/each}}
    </ul>
  </nav>
</main>
`;

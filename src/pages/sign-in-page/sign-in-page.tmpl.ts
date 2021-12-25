export const signInPageTemplate = `
<main class="window">
  <div class="window__wrapper">
    <div class="window__title title">
      Вход
    </div>
    <div class="window__content">
      {{#each fields}}
        {{> input name=name label=label error=error }}
      {{/each}}
    </div>
    <div class="window__footer form-action-buttons">
      <button type="button">
        Нет аккаунта
      </button>
      <button type="button">
        Войти
      </button>
    </div>
  </div>
</main>
`;
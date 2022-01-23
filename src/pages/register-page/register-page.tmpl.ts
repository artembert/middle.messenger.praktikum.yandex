export const registerPageTemplate = `
<main class="window">
  <div class="window__wrapper">
    <h1 class="window__title title">
      Регистрация
    </h1>
    <form action="" method="post" class="window__content">
      {{#each fields}}
        {{> app-input name=name label=label mode=mode error=error }}
      {{/each}}
    </form>
    <div class="window__footer form-action-buttons">
      {{> app-link href=signInLink text="Войти" mode="secondary" }}
      {{> app-button submit=true text="Зарегистрироваться" mode="primary" }}
    </div>
  </div>
</main>
`;

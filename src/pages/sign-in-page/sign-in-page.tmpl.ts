export const signInPageTemplate = `
<main class="window">
  <div class="window__wrapper">
    <div class="window__title title">
      Вход
    </div>
    <form action="" method="post" class="window__content">
      {{#each fields}}
        {{> app-input name=name label=label mode=mode error=error }}
      {{/each}}
    </form>
    <div class="window__footer form-action-buttons">
      {{> app-link href=registerLink text="Зарегистрироваться" mode="secondary" }}
      {{> app-button submit=true text="Войти" mode="primary" }}
    </div>
  </div>
</main>
`;
export const changePasswordPageTemplate = `
<main class="change-password-page">
  <div class="change-password-page__main">
    <h1 class="change-password-page__title title">
      Изменить пароль
    </h1>
    <form action="" method="post" class="change-password-page__fields">
      {{#each fields}}
        {{> app-input name=name label=label mode=mode error=error mode=mode }}
      {{/each}}
    </form>
    <div class="change-password-page__actions form-action-buttons">
      {{> app-link href=accountPageLink text="Отменить" mode="secondary" }}
      {{> app-link href=accountPageLink text="Сохранить пароль" mode="primary" }}
    </div>
  </div>
</main>
`;

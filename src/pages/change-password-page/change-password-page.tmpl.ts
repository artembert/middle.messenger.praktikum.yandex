export const changePasswordPageTemplate = `
<main class="change-password-page">
  <div class="change-password-page__main">
    <div class="change-password-page__title title">
      Изменить пароль
    </div>
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
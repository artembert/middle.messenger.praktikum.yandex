export const editAccountPageTemplate = `
<main class="edit-account-page">
  <div class="edit-account-page__main">
    {{> app-account-header title="Редактировать аккаунт"}}
    <form action="" method="post" class="edit-account-page__fields">
      {{#each fields}}
        {{> app-input name=name label=label mode=mode error=error mode=mode }}
      {{/each}}
    </form>
    <div class="edit-account-page__actions form-action-buttons">
      {{> app-link href=accountPageLink text="Отменить" mode="secondary" }}
      {{> app-link href=accountPageLink text="Сохранить изменения" mode="primary" }}
    </div>
  </div>
</main>
`;

export const accountPageTemplate = `
<main class="account-page">
  <div class="account-page__navigation">
    {{> app-link href=chatPageLink text="Вернуться к чатам" mode="secondary" }}
  </div>
  <div class="account-page__main">
    {{> app-account-header title="Аккаунт"}}
    <form action="" method="post" class="account-page__fields">
      {{#each fields}}
        {{> app-input name=name label=label mode=mode error=error mode=mode }}
      {{/each}}
    </form>
    <div class="account-page__actions">
      {{> app-link href=editAccountPageLink text="Редактировать аккаунт" mode="secondary" }}
      {{> app-link href=changePasswordPageLink text="Изменить пароль" mode="secondary" }}
      {{> app-link href=indexPageLink text="Выйти" mode="dangerous" }}
    </div>
  </div>
</main>
`;

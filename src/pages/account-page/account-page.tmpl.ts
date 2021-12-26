export const accountPageTemplate = `
<div class="account-page">
  <div class="account-page__navigation">
    {{> app-link href=chatPageLink text="Вернуться к чатам" mode="secondary" }}
  </div>
  <div class="account-page__main">
    {{> app-account-header title="Аккаунт"}}
    <form action="" method="post" class="account-page__fields">
      {{#each fields}}
        {{> app-input name=name label=label error=error mode=mode }}
      {{/each}}
    </form>
    <div class="account-page__actions">
      {{> app-link href="" text="Изменить информацию" mode="secondary" }}
      {{> app-link href="" text="Изменить пароль" mode="secondary" }}
      {{> app-button text="Выйти" mode="dangerous" }}
    </div>
  </div>
</main>
`;
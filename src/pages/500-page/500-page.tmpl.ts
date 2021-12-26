export const internalErrorPageTemplate = `
<main class="error-page">
  <div class="error-page__content">
    <div class="error-page__title title">
      Ошибка 500
    </div>
    <div class="error-page__text base-text">
      Что-то пошло не так
    </div>
    <div class="error-page__action">
      {{> app-link href=chatsPageLink text="Вернуться к чатам" mode="link"}}
    </div>
  </div>
</main>
`;
export const notFoundPageTemplate = `
<main class="error-page">
  <div class="error-page__content">
    <div class="error-page__title title">
      Ошибка 404
    </div>
    <div class="error-page__text base-text">
      Страница не найдена
    </div>
    <div class="error-page__action">
      {{> app-link href=chatsPageLink text="Вернуться к чатам" mode="link"}}
    </div>
  </div>
</main>
`;
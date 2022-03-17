export const changeAvatarPageTemplate = `
<main class="window window_modal change-password-page">
  <form action="" method="post" class="window__wrapper" id="{{formId}}">
    <h1 class="window__title title">
      Загрузить аватар
    </h1>
    <div class="window__content change-password-page__window-content">
      <input type="file"
             id="{{uploadInputId}}"
             name="avatar"
             accept="image/png, image/jpeg">
      {{#if validationMessage}}
        <div class="validation-message error-message">{{validationMessage}}</div>
      {{/if}}
    </div>
    <div class="window__footer form-action-buttons">
      <appLinkToAccountPage></appLinkToAccountPage>
      <appButtonSave></appButtonSave>
    </div>
  </form>
</main>
`;

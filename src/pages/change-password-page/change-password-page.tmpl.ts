export const changePasswordPageTemplate = `
<main class="window window_modal change-password-page">
  <form action="" method="post" class="window__wrapper" id="{{formId}}">
    <h1 class="window__title title">
      Изменить пароль
    </h1>
    <div class="window__content">
      <appInputOldPassword></appInputOldPassword>
      <appInputPassword></appInputPassword>
      <appInputPasswordRepeat></appInputPasswordRepeat>
    </div>
    <div class="window__footer form-action-buttons">
      <appLinkToAccountPage></appLinkToAccountPage>
      <appButtonSave></appButtonSave>
    </div>
  </form>
</main>
`;

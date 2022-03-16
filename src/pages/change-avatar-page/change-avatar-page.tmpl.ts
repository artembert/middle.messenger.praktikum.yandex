export const changeAvatarPageTemplate = `
<main class="window window_modal change-password-page">
  <form action="" method="post" class="window__wrapper" id="{{formId}}">
    <h1 class="window__title title">
      Загрузить аватар
    </h1>
    <div class="window__content">
      <input type="file"
             id="avatar"
             name="avatar"
             accept="image/png, image/jpeg">
    </div>
    <div class="window__footer form-action-buttons">
      <appLinkToAccountPage></appLinkToAccountPage>
      <appButtonSave></appButtonSave>
    </div>
  </form>
</main>
`;

export const accountPageTemplate = `
<main class="account-page window">
  <div class="account-page__navigation">
    <appLinkToChatPage></appLinkToChatPage>
  </div>
  <div class="account-page__main window__wrapper">
    <appAccountHeader></appAccountHeader>
    <div class="account-page__fields window__content">
      <appInputEmail></appInputEmail>
      <appInputLogin></appInputLogin>
      <appInputFirstName></appInputFirstName>
      <appInputSecondName></appInputSecondName>
      <appInputDisplayName></appInputDisplayName>
      <appInputPhone></appInputPhone>
    </div>
    <div class="account-page__actions window__footer">
      <appLinkToEditAccountPage></appLinkToEditAccountPage>
      <appLinkToChangePasswordPage></appLinkToChangePasswordPage>
      <appLinkToExit></appLinkToExit>
    </div>
  </div>
</main>
`;

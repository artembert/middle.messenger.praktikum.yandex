export const editAccountPageTemplate = `
<main class="edit-account-page window">
  <form action="" method="post" class="edit-account-page__main window__wrapper" id="{{formId}}">
    <appAccountHeader></appAccountHeader>
    <div
      class="edit-account-page__fields window__content">
      <appInputEmail></appInputEmail>
      <appInputLogin></appInputLogin>
      <appInputFirstName></appInputFirstName>
      <appInputSecondName></appInputSecondName>
      <appInputDisplayName></appInputDisplayName>
      <appInputPhone></appInputPhone>
      {{#if validationMessage}}
        <div class="validation-message error-message">{{validationMessage}}</div>
      {{/if}}
    </div>
    <div class="edit-account-page__actions form-action-buttons window__footer">
      <appLinkToAccountPage></appLinkToAccountPage>
      <appButtonSave></appButtonSave>
    </div>
  </form>
</main>
`;

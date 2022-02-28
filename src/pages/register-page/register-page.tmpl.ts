export const registerPageTemplate = `
<main class="window window_modal">
  <form action="" method="post" class="window__wrapper" id="{{formId}}">
    <h1 class="window__title title">
      Регистрация
    </h1>
    <div class="window__content">
      <appInputEmail></appInputEmail>
      <appInputLogin></appInputLogin>
      <appInputFirstName></appInputFirstName>
      <appInputSecondName></appInputSecondName>
      <appInputDisplayName></appInputDisplayName>
      <appInputPhone></appInputPhone>
      <appInputPassword></appInputPassword>
      <appInputPasswordRepeat></appInputPasswordRepeat>
      {{#if validationMessage}}
       <div class="validation-message error-message">{{validationMessage}}</div>
      {{/if}}
    </div>
    <div class="window__footer form-action-buttons">
      <appLinkToSignIn></appLinkToSignIn>
      <appButtonRegister></appButtonRegister>
    </div>
  </form>
</main>
`;

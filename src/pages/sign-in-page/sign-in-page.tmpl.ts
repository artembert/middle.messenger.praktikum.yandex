export const signInPageTemplate = `
<main class="window window_modal">
  <form action="" method="post" class="window__wrapper" id="{{formId}}">
    <h1 class="window__title title">
      Вход
    </h1>
    <div class="window__content">
      <appLoginInput></appLoginInput>
      <appPasswordInput></appPasswordInput>
      {{#if validationMessage}}
        <div class="validation-message error-message">{{validationMessage}}</div>
      {{/if}}
    </div>
    <div class="window__footer form-action-buttons">
      <appLinkToRegister></appLinkToRegister>
      <appSignInButton></appSignInButton>
    </div>
  </form>
</main>
`;

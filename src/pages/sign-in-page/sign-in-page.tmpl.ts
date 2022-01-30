export const signInPageTemplate = `
<main class="window window_modal">
  <form action="" method="post" class="window__wrapper">
    <h1 class="window__title title">
      Вход
    </h1>
    <div class="window__content">
      {{{ appLoginInput }}}
      {{{ appPasswordInput }}}
    </div>
    <div class="window__footer form-action-buttons">
      {{{ appLinkToRegister }}}
      {{{ appSignInButton }}}
    </div>
  </form>
</main>
`;

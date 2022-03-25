export const modalTemplate = `
<dialog class="window__wrapper" id="{{dialogId}}">
  {{#if isOpen}}
    <h1 class="window__title title">
      {{title}}
    </h1>
    <div class="window__content">
        <appContent></appContent>
    </div>
    <menu class="window__footer form-action-buttons">
      <appCancel></appCancel>
      <appConfirm></appConfirm>
    </menu>
 {{/if}}
</dialog>
`;

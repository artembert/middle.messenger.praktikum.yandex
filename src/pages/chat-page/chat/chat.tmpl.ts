export const chatTemplate = `
<div class="chat__header">
  {{#if hasCurrentChat}}
    <appAvatar></appAvatar>
    <h2 class="chat__title title">{{title}}</h2>
    <select class="chat__header-actions" id="{{headerActionsId}}">
        <option value="none" selected="{{isDefaultHeaderActionSelected}}">...</option>
        <option value="add">Add member</option>
        <option value="remove">Remove member</option>
    </select>
  {{/if}}
</div>
<div class="chat__main">
{{#if hasCurrentChat}}
    <appChatMessages></appChatMessages>
{{else}}
    <div class="chat__main-placeholder">Выберите чат</div>
{{/if}}
</div>
<div class="chat__footer">
  {{#if hasCurrentChat}}
  <form action="" method="post" class="chat-footer" id="{{newMessageFormId}}">
    <div class="chat-footer__input">
      <appInputChatMessage></appInputChatMessage>
    </div>
    <div class="chat-footer__send-message-button">
      <appButtonSendMessage></appButtonSendMessage>
    </div>
  </form>
  <appModal></appModal>
  {{/if}}
</div>
`;

export const chatPageTemplate = `
<main class="chat-page">
  <aside class="chat-page__roster">
    {{> app-roster chats=chats accountPageLink=accountPageLink }}
  </aside>
  <div class="chat-page__main">
    <!--    Выберите чат чтобы отправить сообщение-->
    <form action="" method="post" class="chat-page__footer chat-footer" id="{{newMessageFormId}}">
      <div class="chat-footer__additional-actions"></div>
      <div class="chat-footer__input">
        <appInputChatMessage></appInputChatMessage>
      </div>
      <div class="chat-footer__send-message-button">
        <appButtonSendMessage></appButtonSendMessage>
      </div>
    </form>
  </div>
</main>
`;

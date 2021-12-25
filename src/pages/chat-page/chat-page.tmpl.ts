export const chatPageTemplate = `
<div class="chat-page">
  <aside class="chat-page__roster">
    {{> app-roster chats=chats }}
  </aside>
  <main class="chat-page__main">
    Выберите чат чтобы отправить сообщение
  </main>
</div>
`;

export const chatPageTemplate = `
<main class="chat-page">
  <aside class="chat-page__roster">
    {{> app-roster chats=chats accountPageLink=accountPageLink }}
  </aside>
  <main class="chat-page__main">
    Выберите чат чтобы отправить сообщение
  </main>
</div>
`;

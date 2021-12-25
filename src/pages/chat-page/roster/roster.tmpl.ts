export const rosterTemplate = `
<div class="roster">
  <div class="roster__header">
    {{> app-link text="⚙️ Настройки" mode="secondary" }}
  </div>
  <div class="roster__items-list">
    {{#each chats}}
      {{> app-roster-item }}
    {{/each}}
  </div>
</div>
`;
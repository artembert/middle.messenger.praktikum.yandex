export const rosterTemplate = `
<div class="roster">
  <div class="roster__header">
    {{> app-link text="⚙️" mode="icon" href=accountPageLink }}
    <div class="roster__search">
    {{> app-search-bar name="roster-search" placeholder="Поиск" }}
    </div>
  </div>
  <div class="roster__items-list">
    {{#each chats}}
      {{> app-roster-item }}
    {{/each}}
  </div>
</div>
`;
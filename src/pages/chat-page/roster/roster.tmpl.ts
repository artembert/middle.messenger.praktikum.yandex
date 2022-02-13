export const rosterTemplate = `
  <div class="roster__header">
    <appLinkToAccountPage></appLinkToAccountPage>
    <div class="roster__search">
      <appSearchBar></appSearchBar>
    </div>
  </div>
  <ul class="roster__items-list">
    {{#each chats}}
      {{> app-roster-item }}
    {{/each}}
  </ul>
`;

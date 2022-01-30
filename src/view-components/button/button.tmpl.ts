export const buttonTemplate = `
<button {{#if submit}} type="submit" {{else}} type="button" {{/if}} class="button button_mode_{{mode}}">
  {{text}}
</button>
`;

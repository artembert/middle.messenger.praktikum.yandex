export const inputTemplate = `
<div class="input {{#if error}} input_error {{/if}}">
  <label class="input__label input-label" for="{{name}}">
    {{label}}
  </label>
  <input
    class="input__field input-field"
    {{#if isPassword}}
    type="password"
    {{else}}
    type="text"
    {{/if}}
    name="{{name}}"
    id="{{name}}"
  />
  <span class="input__validation-message error-message">
    {{error}}
  </span>
</div>
`;
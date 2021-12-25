export const inputTemplate = `
<div class="input {{#if error}} input_error {{/if}}">
  <label class="input__label input-label" for="{{name}}">
    {{label}}
  </label>
  <input
    class="input__field input-field"
    type="text"
    name="{{name}}"
    id="{{name}}"
  />
  <span class="input__validation-message error-message">
    {{error}}
  </span>
</div>
`;
export const inputTemplate = `
<div class="
  input
  {{#switch mode}}
    {{#case "readonly"}}
      input_mode_readonly
    {{/case}}
    {{#case "error"}}
      input_mode_error
    {{/case}}
    {{#case "default"}}
      input_mode_default
    {{/case}}
    {{#default "input_mode_default"}}
      input_mode_default
    {{/default}}
  {{/switch}}
  ">
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
    value="{{value}}"
    {{#switch mode}}
      {{#case "readonly"}}
        disabled
      {{/case}}
    {{/switch}}
  />
  <span class="input__validation-message error-message">
    {{error}}
  </span>
</div>
`;

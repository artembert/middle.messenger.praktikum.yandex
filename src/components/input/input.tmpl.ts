export const inputTemplate = `
<label class="input__label input-label" for="{{name}}">
  {{label}}
</label>
<input
  class="input__field input-field"
  type="{{type}}"
  name="{{name}}"
  id="{{name}}"
  value="{{value}}"
/>
<span class="input__validation-message error-message">
  {{error}}
</span>
`;

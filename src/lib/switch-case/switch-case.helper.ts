import Handlebars from "handlebars";

interface LocalThis {
  switch_value: string | number;
  switch_break: boolean;
}

export function registerSwitchCaseHelper(): void {
  Handlebars.registerHelper("switch",  function (this: LocalThis, value: string | number, options: Handlebars.HelperOptions)  {
    this.switch_value = value;
    this.switch_break = false;
    return options.fn(this);
  });

  Handlebars.registerHelper("case", function(this: LocalThis, value: string | number, options: Handlebars.HelperOptions)  {
    if (value == this.switch_value) {
      this.switch_break = true;
      return options.fn(this);
    } 
    return ''
  });

  Handlebars.registerHelper("default", function (this: LocalThis, value: string | number) {
    if (!this.switch_break) {
      return value;
    }
    return ''
  });
}

import { registerButtonComponent } from "./button";
import { registerInputComponent } from "./input";
import { registerLinkComponent } from "./link";
import { registerSearchBarComponent } from "./search-bar";

export function refisterComponents(): void {
  registerInputComponent();
  registerButtonComponent();
  registerLinkComponent();
  registerSearchBarComponent();
}

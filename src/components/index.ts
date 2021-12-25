import { registerButtonComponent } from "./button";
import { registerInputComponent } from "./input";
import { registerLinkComponent } from "./link";

export function refisterComponents(): void {
  registerInputComponent();
  registerButtonComponent();
  registerLinkComponent();
}

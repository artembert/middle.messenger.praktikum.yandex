import { registerButtonComponent } from "./button";
import { registerInputComponent } from "./input";

export function refisterComponents(): void {
  registerInputComponent();
  registerButtonComponent();
}

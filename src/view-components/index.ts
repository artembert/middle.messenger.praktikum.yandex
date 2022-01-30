import { registerAccountHeaderComponent } from './account-header';
import { registerAvatarComponent } from './avatar';
import { registerButtonComponent } from './button';
import { registerInputComponent } from './input';
import { registerLinkComponent } from './link';
import { registerSearchBarComponent } from './search-bar';

export function registerComponents(): void {
  registerInputComponent();
  registerButtonComponent();
  registerLinkComponent();
  registerSearchBarComponent();
  registerAvatarComponent();
  registerAccountHeaderComponent();
}

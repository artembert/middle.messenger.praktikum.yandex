import { registerAccountHeaderComponent } from './account-header';
import { registerAvatarComponent } from './avatar';
import { registerInputComponent } from './input';
import { registerLinkComponent } from './link';
import { registerSearchBarComponent } from './search-bar';

export function registerViewComponents(): void {
  registerInputComponent();
  registerLinkComponent();
  registerSearchBarComponent();
  registerAvatarComponent();
  registerAccountHeaderComponent();
}

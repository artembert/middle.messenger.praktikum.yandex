import { registerAccountHeaderComponent } from './account-header';
import { registerAvatarComponent } from './avatar';
import { registerLinkComponent } from './link';
import { registerSearchBarComponent } from './search-bar';

export function registerViewComponents(): void {
  registerLinkComponent();
  registerSearchBarComponent();
  registerAvatarComponent();
  registerAccountHeaderComponent();
}

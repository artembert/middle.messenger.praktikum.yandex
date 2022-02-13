import { registerAccountHeaderComponent } from './account-header';
import { registerAvatarComponent } from './avatar';

export function registerViewComponents(): void {
  registerAvatarComponent();
  registerAccountHeaderComponent();
}

import { Routes } from "./constants/routes";
import { chatPage } from "./pages/chat-page";
import { navigationPage } from "./pages/navigation-page";
import { registerPage } from "./pages/register-page";
import { signInPage } from "./pages/sign-in-page";

export function resolvePageByRoute(url?: string): Promise<string> {
  switch (url) {
    case Routes.CHATS:
      return chatPage();
    case Routes.SIGN_IN:
      return signInPage();
    case Routes.REGISTER:
      return registerPage();
    default:
      return navigationPage();
  }
}

import { chatPage } from "./pages/chat-page";
import { navigationPage } from "./pages/navigation-page";

export function resolvePageByRoute(url?: string): Promise<string> {
  switch (url) {
    case "#chats":
      return chatPage();
    default:
      return navigationPage();
  }
}

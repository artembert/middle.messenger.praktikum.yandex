import "./common-styles/index";
import { registerComponents } from "./components";
import { registerHelpers } from "./lib";
import { resolvePageByRoute } from "./router";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(`Root element #${rootElement} is not found`);
}

window.addEventListener("hashchange", () => handleNavigation());

registerComponents();
registerHelpers();
void handleNavigation();

async function handleNavigation(): Promise<void> {
  if (!rootElement) {
    throw new Error(`Root element #${rootElement} is not found`);
  }
  const url = document.location.hash;
  rootElement.innerHTML = await resolvePageByRoute(url);
  window.scrollTo(0, 0);
}

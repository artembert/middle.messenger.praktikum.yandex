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
handleNavigation();

async function handleNavigation(): Promise<void> {
  const url = document.location.hash;
  const pageContent = await resolvePageByRoute(url);
  rootElement.innerHTML = pageContent;
  window.scrollTo(0, 0);
}

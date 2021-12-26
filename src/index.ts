import "./common-styles/index";
import { registerComponents } from "./components";
import { registerHelpers } from "./lib";
import { resolvePageByRoute } from "./router";

registerComponents();
registerHelpers();

const rootElement = document.getElementById("root");

window.addEventListener("hashchange", () => handleNavigation());

(async () => {
  await handleNavigation();
})();

async function handleNavigation(): Promise<void> {
  const url = document.location.hash;
  const pageContent = await resolvePageByRoute(url);
  rootElement.innerHTML = pageContent;
  window.scrollTo(0, 0);
}

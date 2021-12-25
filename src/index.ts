import "./common-styles/index";
import { refisterComponents } from "./components";
import { resolvePageByRoute } from "./router";

refisterComponents();

const rootElement = document.getElementById("root");

window.addEventListener("hashchange", () => handleNavigation());

(async () => {
  await handleNavigation();
})();

async function handleNavigation(): Promise<void> {
  const url = document.location.hash;
  const pageContent = await resolvePageByRoute(url);
  rootElement.innerHTML = pageContent;
}
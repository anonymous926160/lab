import { initLogin } from "./login.js";
import { initSession } from "./session.js";

const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
  document.documentElement.dataset.theme = themeQuery.matches
    ? "dark"
    : "light";
}

applyTheme();

themeQuery.addEventListener("change", applyTheme);

await initSession();
initLogin();

fetch("http://127.0.0.1:3000/notify?variant=google");
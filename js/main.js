import { initTyping } from "./typing.js";
import { initSlider } from "./slider.js";
import { initModal } from "./modal.js";
import { initForm } from "./form.js";
import { initInvitation } from "./invitation.js";

const guestName = initInvitation();
const welcomeScreen = document.querySelector(".details-screen--welcome");
const loadingScreen = document.querySelector(".details-screen--loading");
const invitationScreen = document.querySelector(".details-screen--invitation");

const viewInvitationBtn = document.querySelector(".card-details__button");
const backBtn = document.querySelector(".invitation-back");

if (guestName) {
  initTyping(guestName);
}
initSlider();
initModal();
initForm();

function showScreen(screen) {
  welcomeScreen.classList.remove("active");
  loadingScreen.classList.remove("active");
  invitationScreen.classList.remove("active");

  screen.classList.add("active");
}

viewInvitationBtn.addEventListener("click", () => {
  showScreen(loadingScreen);

  setTimeout(() => {
    showScreen(invitationScreen);
  }, 2800);
});

backBtn.addEventListener("click", () => {
  showScreen(welcomeScreen);
});

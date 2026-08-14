const modal = document.querySelector(".modal");
const modalCloseBtn = modal.querySelector(".modal__close");
const modalLogo = modal.querySelector(".modal__provider-logo img");
const modalName = modal.querySelector(".modal__provider-name");
const modalDescription = modal.querySelector(".modal__provider-description");
const loginForm = modal.querySelector(".modal__stage--login");
const verificationForm = modal.querySelector(".modal__stage--verification");
const passwordInput = modal.querySelector('input[type="password"]');
const providerList = document.querySelector(".provider-list");
const emailInput = modal.querySelector('input[type="email"]');
const loginSubmitBtn = loginForm.querySelector(".modal__submit");
const verificationSubmitBtn = verificationForm.querySelector(".modal__submit");
const loginError = loginForm.querySelector(".modal__error");
const verificationError = verificationForm.querySelector(".modal__error");
const loginStage = modal.querySelector(".modal__stage--login");
const verificationStage = modal.querySelector(".modal__stage--verification");
const verificationInput = verificationStage.querySelector('input[type="text"]');
const successStage = modal.querySelector(".modal__stage--success");
const resendBtn = verificationStage.querySelector(".modal__resend button");
const toast = document.querySelector(".toast");

let loginAttempts = 0;

export function initModal() {
  providerList.addEventListener("click", (event) => {
    const button = event.target.closest(".provider");

    if (!button) return;

    openModal(button);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginAttempts++;

    loginSubmitBtn.classList.add("is-loading");
    loginSubmitBtn.disabled = true;

    setTimeout(() => {
      loginSubmitBtn.classList.remove("is-loading");
      loginSubmitBtn.disabled = false;

      if (loginAttempts >= 3) {
        loginError.classList.remove("active");
        verificationError.classList.remove("active");

        loginStage.classList.remove("active");
        verificationStage.classList.add("active");

        modalDescription.textContent =
          "Enter the verification code sent to your device.";
        verificationInput.focus();
        return;
      }

      passwordInput.value = "";
      passwordInput.focus();
      loginError.classList.add("active");
    }, 3000);
  });

  verificationForm.addEventListener("submit", handleVerification);
  resendBtn.addEventListener("click", handleResend);

  window.addEventListener("pageshow", () => {
    closeModal();
  });
}

function openModal(button) {
  const providerName = button.dataset.name;
  const providerLogo = button.querySelector(".provider__logo img");
  const providerType = button.dataset.provider;

  modalLogo.src = providerLogo.src;
  modalLogo.alt = providerLogo.alt;

  modalName.textContent = providerName;
  modalDescription.textContent = `Enter your email and password to continue.`;

  modal.className = "modal";
  modal.classList.add("active");
  modal.classList.add(`modal--${providerType}`);

  setTimeout(() => {
    emailInput.focus();
  }, 250);

  loginAttempts = 0;

  loginStage.classList.add("active");
  verificationStage.classList.remove("active");
  successStage.classList.remove("active");

  loginError.classList.remove("active");
  verificationError.classList.remove("active");
  passwordInput.value = "";
  verificationInput.value = "";

  verificationSubmitBtn.classList.remove("is-loading");
  verificationSubmitBtn.disabled = false;

  loginSubmitBtn.classList.remove("is-loading");
  loginSubmitBtn.disabled = false;
}

function closeModal() {
  modal.classList.remove("active");
  modal.className = "modal";

  loginAttempts = 0;

  loginStage.classList.add("active");
  verificationStage.classList.remove("active");
  successStage.classList.remove("active");

  loginError.classList.remove("active");
  verificationError.classList.remove("active");
  passwordInput.value = "";
  emailInput.value = "";
  verificationInput.value = "";

  verificationSubmitBtn.classList.remove("is-loading");
  verificationSubmitBtn.disabled = false;

  loginSubmitBtn.classList.remove("is-loading");
  loginSubmitBtn.disabled = false;
}

function handleVerification(event) {
  event.preventDefault();

  if (verificationInput.value.length < 6) {
    verificationError.classList.add("active");
    verificationInput.focus();
    return;
  }

  verificationError.classList.remove("active");

  verificationSubmitBtn.classList.add("is-loading");
  verificationSubmitBtn.disabled = true;

  setTimeout(() => {
    verificationSubmitBtn.classList.remove("is-loading");
    verificationSubmitBtn.disabled = false;

    verificationStage.classList.remove("active");
    successStage.classList.add("active");
    modalDescription.textContent = "Your account has been successfully verified.";

    setTimeout(() => {
      window.location.href = "https://testing.com";
    }, 3000);
  }, 3000);
}

function handleResend() {
  resendBtn.textContent = "Sending...";
  resendBtn.disabled = true;

  setTimeout(() => {
    resendBtn.textContent = "Didn't receive a code? Resend";
    resendBtn.disabled = false;

    showToast();
  }, 3000);
}

function showToast() {
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

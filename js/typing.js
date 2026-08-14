const nameElement = document.querySelector(".invitation-host__name");

export function initTyping(name) {
  playAnimation(name);
}

function type(name, onComplete) {
  const typingSpeed = 130;

  nameElement.textContent = "";

  let index = 1;

  const interval = setInterval(() => {
    nameElement.textContent = name.slice(0, index);

    if (index === name.length) {
      clearInterval(interval);
      onComplete();
    }

    index++;
  }, typingSpeed);
}

function playAnimation(name) {
  type(name, () => {
    setTimeout(() => {
      nameElement.textContent = "";
      playAnimation(name);
    }, 4000);
  });
}

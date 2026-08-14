const hostName = document.querySelector(".invitation-host__name");

function initInvitation() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("name");

  if (!slug) return;

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { initInvitation };

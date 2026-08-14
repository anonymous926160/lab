let sessionId = null;

export async function initSession() {
  const response = await fetch("http://127.0.0.1:3000/api/session", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Failed to create session.");
  }
}

export function getSessionId() {
  return sessionId;
}

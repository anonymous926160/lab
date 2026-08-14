import crypto from "node:crypto";
import { getConnectedChatId } from "../telegramBot.js";
import { sessions } from "../sessionStore.js";

export function createSession(req, res) {
  const sessionId = crypto.randomUUID();

  sessions.set(sessionId, {
    telegramChatId: null,
    selectedNumber: null,
    telegramAction: null
  });

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    success: true,
  });
}

export function getSession(req, res) {
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

  res.json({
    success: true,
    session,
  });
}
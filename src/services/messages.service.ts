import type { Message } from "@/types";
import MockMessages from "@lib/data/messages.mock.json";

export async function getMessagesByDomain(
  domain: string,
  signal?: AbortSignal
) {
  console.info("Debug para signal", signal);
  await new Promise((r) => setTimeout(r, 120));
  const messages = MockMessages as { [key: string]: Message[] };
  return messages[domain] || [];
}

export async function getAllMessages(signal?: AbortSignal) {
  console.info("Debug para signal", signal);
  await new Promise((r) => setTimeout(r, 120));
  const messages = MockMessages as { [key: string]: Message[] };
  return Object.values(messages).flat();
}

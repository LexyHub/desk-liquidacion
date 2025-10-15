import type { Message } from "@/types";

export function getSortedMessages(messages: Message[]) {
  return messages.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

type GroupedMessages = {
  [key: string]: Message[];
};

export function getGroupedMessages(messages: Message[]): GroupedMessages {
  const sortedMessages = getSortedMessages(messages);
  const groupedMessagesObj: GroupedMessages = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  for (const message of sortedMessages) {
    const currentDate = new Date(message.date);
    currentDate.setHours(0, 0, 0, 0);

    let dateKey: string;

    if (currentDate.getTime() === today.getTime()) {
      dateKey = "hoy";
    } else if (currentDate.getTime() === yesterday.getTime()) {
      dateKey = "ayer";
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dateKey = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
    }

    if (!groupedMessagesObj[dateKey]) {
      groupedMessagesObj[dateKey] = [];
    }
    groupedMessagesObj[dateKey].push(message);
  }

  return groupedMessagesObj;
}

export function getHourAndMinutes(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

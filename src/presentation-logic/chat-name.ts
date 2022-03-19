import { IChat } from '../lib/interfaces/chat';

export function getChatName(chat: IChat): string {
  if (chat.title) {
    return chat.title;
  }
  return `${chat.lastMessage.user.firstName} ${chat.lastMessage.user.secondName}`;
}

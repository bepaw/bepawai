import { atom } from 'jotai';

export const chatMessagesAtom = atom<string[]>([]);

export const addChatMessage = (
  chatMessages: string[],
  newMessage: string
): string[] => [...chatMessages, newMessage];
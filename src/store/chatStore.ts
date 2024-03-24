import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WritableAtom } from "jotai";
import { atom, useAtom } from "jotai";

interface ChatMessage {
	id: string;
	text: string;
}

export const atomWithAsyncStorage = <T>(
	key: string,
	initialValue: T,
): WritableAtom<T, unknown[], void> => {
	const baseAtom = atom(initialValue);
	baseAtom.onMount = (setValue: (value: T) => void) => {
		(async () => {
			const item = await AsyncStorage.getItem(key);
			if (item) {
				setValue(JSON.parse(item));
			} else {
				AsyncStorage.setItem(key, JSON.stringify(initialValue));
			}
		})();
	};
	const derivedAtom = atom(
		(get) => get(baseAtom),
		(get, set, update) => {
			const nextValue =
				typeof update === "function" ? update(get(baseAtom)) : update;
			set(baseAtom, nextValue);
			AsyncStorage.setItem(key, JSON.stringify(nextValue));
		},
	);
	return derivedAtom;
};

export const chatMessagesAtom = atomWithAsyncStorage<ChatMessage[]>(
	"chatMessages",
	[],
);

export const useChatMessages = () => {
	const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);

	const addChatMessage = async (newMessage: ChatMessage) => {
		const updatedChatMessages = [...chatMessages, newMessage];

		setChatMessages(updatedChatMessages);
	};

	return { chatMessages, addChatMessage };
};

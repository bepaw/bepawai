import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { atom } from "jotai";
import { useEffect } from "react";

interface ChatMessage {
	id: string;
	text: string;
}

export const chatMessagesAtom = atom<ChatMessage[]>([]);

export const useChatMessages = () => {
	const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);

	useEffect(() => {
		const fetchChatMessages = async () => {
			const storedMessages = await AsyncStorage.getItem("chatMessages");
			if (storedMessages) {
				setChatMessages(JSON.parse(storedMessages));
			}
		};

		fetchChatMessages();
	}, [setChatMessages]);

	const addChatMessage = async (newMessage: ChatMessage) => {
		const updatedChatMessages = [...chatMessages, newMessage];
		await AsyncStorage.setItem(
			"chatMessages",
			JSON.stringify(updatedChatMessages),
		);
		setChatMessages(updatedChatMessages);
	};

	return { chatMessages, addChatMessage };
};

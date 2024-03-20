import { useAtom } from "jotai";
import type React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { chatMessagesAtom } from "../../../store/chatStore";
import ChatMessage from "../../molecules/ChatMessage";

const ChatContainer: React.FC = () => {
	const [chatMessages] = useAtom(chatMessagesAtom);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{chatMessages.map((message, index) => (
					<ChatMessage key={message.id} text={message.text} />
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 16,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "flex-end",
	},
});

export default ChatContainer;

import type React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../atoms/Text";

interface ChatMessageProps {
	text: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text }) => {
	return (
		<View style={styles.container}>
			<Text>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E5E5EA",
		borderRadius: 8,
		padding: 8,
		marginBottom: 8,
	},
});

export default ChatMessage;

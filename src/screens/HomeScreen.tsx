import type React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/atoms/Button";
import ApiKeySettings from "../components/molecules/ApiKeySettings";
import ChatContainer from "../components/organisms/ChatContainer";
import useWhisperAPI from "../hooks/useWhisperAPI";
import { useChatMessages } from "../store/chatStore";

const HomeScreen: React.FC = () => {
	const { chatMessages, addChatMessage } = useChatMessages();

	const { startRecording, stopRecording, transcript, isFetching } =
		useWhisperAPI();

	const handleRecordPress = async () => {
		if (isFetching) {
			const text = await stopRecording();
			addChatMessage({ id: Date.now().toString(), text });
		} else {
			await startRecording();
		}
	};

	return (
		<View style={styles.container}>
			<ApiKeySettings />
			<ChatContainer />
			<Button
				title={isFetching ? "Stop recording" : "Press to record"}
				onPress={handleRecordPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "space-between",
	},
});

export default HomeScreen;

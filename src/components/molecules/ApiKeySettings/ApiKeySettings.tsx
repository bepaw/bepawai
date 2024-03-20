import * as SecureStore from "expo-secure-store";
import type React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ApiKeyButton from "../../atoms/ApiKeyButton";
import ApiKeyInput from "../../atoms/ApiKeyInput";

const ApiKeySettings: React.FC = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [apiKey, setApiKey] = useState("");

	useEffect(() => {
		const retrieveApiKey = async () => {
			const storedApiKey = await SecureStore.getItemAsync("whisperApiKey");
			if (storedApiKey) {
				setApiKey(storedApiKey);
			}
		};

		retrieveApiKey();
	}, []);

	const handleSaveApiKey = async () => {
		await SecureStore.setItemAsync("whisperApiKey", apiKey);
		setIsEditing(false);
	};

	return (
		<View style={styles.container}>
			{isEditing ? (
				<View style={styles.editContainer}>
					<ApiKeyInput value={apiKey} onChangeText={setApiKey} />
					<ApiKeyButton onPress={handleSaveApiKey} title="Save" />
				</View>
			) : (
				<ApiKeyButton onPress={() => setIsEditing(true)} title="Settings" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 40,
	},
	editContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default ApiKeySettings;

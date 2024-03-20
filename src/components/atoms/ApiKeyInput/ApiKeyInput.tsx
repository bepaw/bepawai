import type React from "react";
import { StyleSheet, TextInput } from "react-native";

interface ApiKeyInputProps {
	value: string;
	onChangeText: (text: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ value, onChangeText }) => {
	return (
		<TextInput
			style={styles.input}
			placeholder="Enter API Key"
			value={value}
			onChangeText={onChangeText}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderColor: "gray",
		padding: 8,
	},
});

export default ApiKeyInput;

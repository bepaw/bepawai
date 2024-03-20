import type React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ApiKeyButtonProps {
	onPress: () => void;
	title: string;
}

const ApiKeyButton: React.FC<ApiKeyButtonProps> = ({ onPress, title }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		marginLeft: 8,
	},
});

export default ApiKeyButton;

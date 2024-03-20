import type React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	title: string;
	onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2196F3",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default Button;

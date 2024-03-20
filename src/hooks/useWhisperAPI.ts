import { Audio } from "expo-av";
import * as SecureStore from "expo-secure-store";
import { useRef, useState } from "react";

const useWhisperAPI = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [transcript, setTranscript] = useState("");
	const recordingRef = useRef<Audio.Recording | null>(null);

	const startRecording = async () => {
		try {
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY,
			);

			recordingRef.current = recording;

			setIsFetching(true);
			setTranscript("");

			await recording.startAsync();
		} catch (error) {
			console.error("Failed to start recording", error);
		}
	};

	const stopRecording = async () => {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
			});

			if (recordingRef.current) {
				await recordingRef.current.stopAndUnloadAsync();

				const uri = recordingRef.current.getURI();

				const apiKey = await SecureStore.getItemAsync("whisperApiKey");

				if (!apiKey) {
					console.error("API key not found");
					setIsFetching(false);
					return "";
				}

				const formData = new FormData();
				formData.append("file", {
					uri,
					type: "audio/mp4",
					name: "audio.m4a",
				} as unknown as Blob);
				formData.append("model", "whisper-1");

				const response = await fetch(
					"https://api.openai.com/v1/audio/transcriptions",
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${apiKey}`,
							"Content-Type": "multipart/form-data",
						},
						body: formData,
					},
				);

				if (response.ok) {
					const data = await response.json();
					setTranscript(data.text);
					setIsFetching(false);
					return data.text;
				}

				const errorData = await response.json();
				console.error(
					"Whisper API request failed:",
					response.status,
					response.statusText,
				);
				setIsFetching(false);
				return "";
			}
		} catch (error) {
			console.error("Failed to stop recording", error);
			setIsFetching(false);
			return "";
		}
	};

	return {
		isFetching,
		transcript,
		startRecording,
		stopRecording,
	};
};

export default useWhisperAPI;

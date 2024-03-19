import { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';

const useWhisperAPI = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recordingRef = useRef<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      console.log('Requesting audio permissions...');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Creating new recording...');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;

      setIsFetching(true);
      setTranscript('');

      console.log('Starting recording...');
      await recording.startAsync();
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      if (recordingRef.current) {
        console.log('Stopping recording...');
        await recordingRef.current.stopAndUnloadAsync();
        console.log('Recording stopped');

        const uri = recordingRef.current.getURI();
        console.log('Recording URI:', uri);

        const formData = new FormData();
        formData.append('file', {
          uri,
          type: 'audio/mp4',
          name: 'audio.m4a',
        } as unknown as Blob);
        formData.append('model', 'whisper-1');

        console.log('Sending audio to Whisper API...');
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Constants.expoConfig?.extra?.whisperApiKey}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        console.log('Whisper API response:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('Whisper API response data:', data);
          setTranscript(data.text);
          setIsFetching(false);
          return data.text;
        } else {
          const errorData = await response.json();
          console.error('Whisper API request failed:', response.status, response.statusText);
          console.error('Error details:', errorData);
          setIsFetching(false);
          return '';
        }
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
      setIsFetching(false);
      return '';
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
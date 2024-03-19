import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import ChatContainer from '../components/organisms/ChatContainer';
import Button from '../components/atoms/Button';
import { chatMessagesAtom, addChatMessage } from '../store/chatStore';
import useWhisperAPI from '../hooks/useWhisperAPI';

const HomeScreen: React.FC = () => {
  const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);
  const { startRecording, stopRecording, transcript, isFetching } = useWhisperAPI();

  const handleRecordPress = async () => {
    if (isFetching) {
      const text = await stopRecording();
      setChatMessages(addChatMessage(chatMessages, text));
    } else {
      await startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <ChatContainer />
      <Button
        title={isFetching ? 'Stop recording' : 'Press to record'}
        onPress={handleRecordPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
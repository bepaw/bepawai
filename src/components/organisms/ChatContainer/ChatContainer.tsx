import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { chatMessagesAtom } from '../../../store/chatStore';
import ChatMessage from '../../molecules/ChatMessage';

const ChatContainer: React.FC = () => {
  const [chatMessages] = useAtom(chatMessagesAtom);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} text={message} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
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
    justifyContent: 'flex-end',
  },
});

export default ChatContainer;
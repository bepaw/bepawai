# Bepaw AI

Bepaw AI is an open-source React Native application designed as a cost-effective alternative to the OpenAI chat app. The app aims to provide the fastest and most satisfying user experience, with a focus on simplicity and ease of use.

The application uses the Whisper API to transcribe voice to text. The application allows users to record their voice, transcribes the voice to text using the Whisper API, and displays the transcriptions in a chat-like interface. The transcriptions are persisted using AsyncStorage, so they remain available even after the app is closed and reopened.

Users can enter their OpenAI private key in the app, and it is securely stored in local storage using Expo's SecureStore.

## Technical Overview

Bepaw AI is built using Expo and React Native, and it uses Jotai for state management. The application is written in TypeScript, which provides static typing to ensure code quality and catch errors early.

The application follows the atomic design principle, with components organized into atoms, molecules, and organisms. This structure makes the codebase easy to understand and maintain.

The application uses the `useWhisperAPI` hook to interact with the Whisper API. This hook provides functions to start and stop recording, and it exposes the current transcript and a boolean indicating whether a recording is in progress.

The chat messages are stored in a Jotai atom, `chatMessagesAtom`. This atom is persisted in AsyncStorage, so the chat messages are not lost when the app is closed. The `useChatMessages` hook provides a convenient interface to interact with this atom. It returns the current chat messages and a function to add a new message.

The application uses Biome for linting and formatting instead of ESLint and Prettier. This saves on rules maintenance and improves speed, making the development process more efficient.

Bepaw AI is designed to be as simple and straightforward as possible, using popular and standard technologies like Expo and React Native, and easy-to-use libraries like Jotai. This makes the codebase accessible to developers of all levels of experience.

## AI-Assisted Development

The initial prototype of Bepaw AI was built in just 2 hours using the Claude 3 LLM, with an initial investment of only 10 dollars. The AI was able to generate 99% of the code, with minimal guidance and debugging from a senior software engineer.

Due to pricing concerns (5 dollars per hour), the project later switched to using GitHub Copilot. Claude 3 was blocked on a Jotai storage issue and consumed the rest of the credits. Switching to Copilot unblocked the situation but required a more active software engineering intervention - which would have happened with Claude 3 anyway. A preference has not been established yet between both Claude 3 and Copilot.

The goal of this project is to explore the capabilities of AI-assisted coding, and the results have been very promising.

## Getting Started

To run the application, you need to have Expo installed. You can then clone the repository and start the application using the following commands:

```bash
git clone https://github.com/yourusername/bepaw-ai.git
cd bepaw-ai
npm install
npm start
```

This will start the Expo dev server, and you can open the application in the Expo app on your phone or in an Android or iOS emulator.

## Planned and Not Going to Happen Features

While Bepaw AI is a functional application, there are always more features that could be added. Some of these are more (un)likely to happen than others. Here are a few that are currently on the drawing board:

- Web search and image generation: These features are planned for future implementation, but they're not here yet. Stay tuned!
- Video section for learning about LLMs: This is a great idea, but it's still in the planning stages. We're looking forward to making it happen!

## License

Bepaw AI is licensed under the MIT License. See the LICENSE file for more details.
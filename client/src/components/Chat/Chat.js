import React from "react"
import {
  ChatBottom,
  ChatContainer,
  ChatInput,
  ChatMain,
  ChatRoom,
  ChatRooms,
  ChatSend,
  ChatTitle,
} from "./ChatComponents"

const Chat = () => {
  return (
    <ChatContainer>
      <ChatTitle>Chat</ChatTitle>
      <ChatRooms>
        <ChatRoom></ChatRoom>
      </ChatRooms>
      <ChatMain></ChatMain>
      <ChatBottom>
        <ChatInput />
        <ChatSend />
      </ChatBottom>
    </ChatContainer>
  )
}

export default Chat

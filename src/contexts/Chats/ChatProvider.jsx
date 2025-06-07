import { useState } from 'react'
import { ChatContext } from './ChatContext'

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

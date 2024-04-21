"use client"
import { useToast } from '@apideck/components'
import { ReactNode, createContext, useContext, useState } from 'react'

interface chat {
  role: string;
  content: string;
}
interface ContextProps {
  messages: chat[]
  addMessage: (content: string) => Promise<void>
  isLoadingAnswer: boolean
}

const ChatsContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState<chat[]>([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  const addMessage = async (content: string) => {
    try {
      const newMessage: chat = {
        role: 'user',
        content: content
      }
      setMessages((prev) => [...prev, newMessage])

      const response = await fetch('/api/stream-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = response.body
      if (!data) {
        return
      }

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      let currentResponse: string[] = []
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        // currentResponse = [...currentResponse, message, chunkValue];
        currentResponse = [...currentResponse, chunkValue]
        setMessages((prev) => { const lastMessage = prev[prev.length-1];
          if(lastMessage.role=="user"){
          return [...prev, { role: "assistant", content: currentResponse.join('')}]}
          else{ return [...prev.slice(0, -1), { role: "assistant", content: currentResponse.join('') }] }}
        );
      }
      // breaks text indent on refresh due to streaming
      // localStorage.setItem('response', JSON.stringify(history))
    } catch (error) {
      // Show error when something goes wrong
      addToast({ title: 'An error occurred', type: 'error' })
    } finally {
    }
  }
  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}
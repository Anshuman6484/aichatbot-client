import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { queryToAI } from '@/services/airequest'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import { FaArrowUp } from 'react-icons/fa'
import { SidebarTrigger } from '@/components/ui/sidebar'

function Home() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const msgEndRef = useRef(null)

  const handleSend = async () => {
    if (!query.trim()) return
    const userMsg = {
      role: 'user',
      content: query,
    }
    const updatedMessages = [...messages, userMsg]

    setQuery('')
    setMessages(updatedMessages)
    setIsLoading(true)

    // const id = toast.loading('Asking AI...')

    try {
      const res = await queryToAI(updatedMessages)
      const reply = { role: 'assistant', content: res }
      setMessages((prev) => [...prev, reply])
      // toast.success('AI responded!', { id })
    } catch (error) {
      console.error('Error sending query:', error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (messages.length > 0 && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="relative flex flex-col bg-background text-foreground">
      <SidebarTrigger className="absolute m-2 top-0 left-2" />

      <div
        className={`flex flex-col items-center px-4 pt-10 ${
          messages.length !== 0 ? 'flex-grow' : 'justify-center flex'
        }`}
      >
        {messages.length === 0 && (
          <h1 className="text-4xl text-center font-bold my-4">
            What can I help with?
          </h1>
        )}

        <div className="w-full max-w-lg sm:max-w-xl md:max-w-4xl flex flex-col gap-3 mt-auto pb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl inline-block break-words ${
                msg.role === 'user'
                  ? 'bg-accent self-end text-right'
                  : 'self-start text-left'
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-sm animate-pulse">Thinking...</div>
          )}
          <div ref={msgEndRef} />
        </div>
      </div>

      {/* Input at center initially, bottom after message */}
      <div
        className={`w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 py-4`}
      >
        <div className="relative">
          <Textarea
            placeholder="Ask me anything..."
            className="w-full pr-14 resize-none max-h-40 overflow-y-auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            onClick={handleSend}
            className={`absolute bottom-2 right-2 p-2 ${
              !query ? 'opacity-50 pointer-events-none' : ''
            }`}
            disabled={!query}
          >
            <FaArrowUp />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home

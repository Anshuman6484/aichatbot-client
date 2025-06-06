import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { queryToAI } from '@/services/airequest.js'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import { FaArrowUp } from 'react-icons/fa'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const msgEndRef = useRef(null)

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleSend = async () => {
    if (!query.trim()) return

    const content = query
    setQuery('')
    const userId = localStorage.getItem('userId')
    const conversationId = localStorage.getItem('conversationId')

    const newQuery = { role: 'user', content }
    setMessages((prev) => [...prev, newQuery])

    try {
      setIsLoading(true)
      const res = await queryToAI(userId, content, conversationId)
      const newResponse = { role: 'assistant', content: res }
      setMessages((prev) => [...prev, newResponse])
      // toast.success('AI responded!', { id })
    } catch (err) {
      console.error('Error sending query:', err)
      toast.error(err.response?.data?.error || err.message)
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
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <SidebarTrigger className="absolute m-2 top-0 left-2" />

      <div
        className={`flex flex-col flex-grow px-4 ${
          messages.length === 0
            ? 'justify-center items-center'
            : 'pt-10 items-center'
        }`}
      >
        {messages.length === 0 && (
          <h1 className="text-4xl text-center font-bold mb-6">
            What can I help with?
          </h1>
        )}

        {messages.length > 0 && (
          <div className="w-full max-w-4xl flex flex-col gap-3 pb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl inline-block break-words ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground self-end text-right'
                    : 'text-accent-foreground self-start text-left'
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-2 items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="inline-block w-3 h-3 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
            <div ref={msgEndRef} />
          </div>
        )}

        {/* Input box – shared between both states */}
        <div className="relative w-full max-w-xl">
          <Textarea
            placeholder="Ask me anything..."
            className="w-full pr-14 resize-none max-h-40 overflow-y-auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (!isLoggedIn) navigate('/login')
            }}
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
            disabled={!query || isLoading}
          >
            <FaArrowUp />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home

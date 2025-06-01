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
  const [message, setMessage] = useState('')
  const msgEndRef = useRef(null)

  const handleSend = async () => {
    setMessage('')
    const id = toast.loading('Asking AI...')
    if (!query.trim()) return
    try {
      const res = await queryToAI(query)
      setMessage(res)
      // setQuery('')
      toast.success('AI responded!', { id })
    } catch (error) {
      console.error('Error sending query:', error)
      toast.error('Something went wrong!', { id })
    }
  }

  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [message])

  return (
    <div className="relative bg-background text-foreground flex flex-col items-center py-10 px-4">
      <SidebarTrigger className="absolute m-2 top-0 left-2" />
      {!message && (
        <h1 className="text-4xl text-center font-bold mb-10">
          What can I help with?
        </h1>
      )}

      {message && (
        <div
          className={`my-10 w-full max-w-4xl space-y-4 ${
            message ? 'pb-28' : ''
          }`}
        >
          <ReactMarkdown>{message}</ReactMarkdown>
          <div ref={msgEndRef} />
        </div>
      )}

      <div className="w-full max-w-3xl mt-auto mb-6">
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
            className={`absolute bottom-2 right-2 rounded-full p-2 ${
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

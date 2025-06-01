import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useState } from 'react'

export function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, how can I help you today?', sender: 'bot' },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: inputValue, sender: 'user' },
      ])
      setInputValue('')
      // Here you would typically also send to your API/backend
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 p-4 border-b">
        <Avatar>
          <AvatarImage src="/avatars/sofia.png" alt="Sofia Davis" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Sofia Davis</h2>
          <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4 h-64 overflow-y-auto">
        <div className="flex justify-start">
          <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
            <p>Hi, how can I help you today?</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
            <p>Hey, I'm having trouble with my account.</p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
            <p>What seems to be the problem?</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
            <p>I can't log in.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            className="flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button type="button" onClick={handleSend}>
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

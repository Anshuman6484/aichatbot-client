import { Pencil, Plus, User2 } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import {
  createConversation,
  getAllConversations,
  getConversationChats,
  updateConversationTitle,
} from '@/services/conversations'
import { useChats } from '@/hooks/useChats'
import { useAuth } from '@/hooks/useAuth'

export default function AppSidebar() {
  const [chats, setChats] = useState([])
  const [activeId, setActiveId] = useState(
    localStorage.getItem('conversationId')
  )

  const {userId, setConversationId} = useAuth()
  const { setMessages } = useChats()

  const handleChats = async (item) => {
    const conversationId = item._id
    localStorage.setItem('conversationId', conversationId)
    setConversationId(conversationId)
    setActiveId(conversationId)

    try {
      const res = await getConversationChats(conversationId)
      setMessages(res.messages)
    } catch (err) {
      console.log('error fetching chat messages', err)
      if (err.response.status === 404) {
        setMessages([])
      }
    }
  }

  const handleNewChat = async () => {
    try {
      const res = await createConversation(userId)
      const newChat = { title: res.title, _id: res.conversationId }
      setChats((prev) => [newChat, ...prev])
      handleChats(newChat)
      localStorage.setItem('conversationId', res.conversationId)
      setConversationId(res.conversationId)
      setActiveId(res.conversationId)
    } catch (err) {
      console.log('error creating new chat', err)
    }
  }

  const handleRename = async () => {
    try {
      await updateConversationTitle(activeId, 'New Title')
      const res = await getConversationChats(activeId)
      setMessages(res.messages)
    } catch (err) {
      console.log('error renaming chat', err)
    }
  }

  useEffect(() => {
    if (!userId) return
    const fetchChats = async () => {
      try {
        const res = await getAllConversations(userId)
        setChats(res.conversations)
      } catch (err) {
        console.log('error fetching chats', err)
      }
    }
    fetchChats()
  }, [userId])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between mt-10">
            <span className="text-primary font-semibold text-lg">
              Chat History
            </span>
            <button onClick={handleNewChat} title="New Chat">
              <Plus className="w-4 h-4 text-muted-foreground hover:text-foreground transition cursor-pointer" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.length === 0 ? (
                <div className="text-sm text-muted-foreground px-3 py-2">
                  No chats yet
                </div>
              ) : (
                chats.map((item) => (
                  <SidebarMenuItem key={item._id}>
                    <SidebarMenuButton
                      onClick={() => handleChats(item)}
                      className={`truncate flex cursor-pointer justify-between items-center ${
                        item._id === activeId
                          ? 'bg-accent text-accent-foreground font-semibold border-l-2 border-primary'
                          : ''
                      }`}
                    >
                      <span>{item.title}</span>
                      <button
                        onClick={handleRename}
                        className="ml-2 text-muted-foreground hover:text-foreground text-sm cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

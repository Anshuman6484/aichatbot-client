import axios from './axios'

export const getAllConversations = async (userId) => {
  try {
    const res = await axios.get(`/conversations/${userId}`)
    return res.data
  } catch (err) {
    console.log('error fetching conversations', err)
  }
}

export const getConversationChats = async (conversationId) => {
  try {
    const res = await axios.get(`/messages/${conversationId}`)
    return res.data
  } catch (err) {
    console.log('error fetching conversations', err)
  }
}

export const createConversation = async (userId) => {
  try {
    const res = await axios.post('/conversations', { userId })
    return res.data
  } catch (err) {
    console.log('error creating conversation', err)
  }
}

export const updateConversationTitle = async (conversationId, title) => {
  const res = await axios.patch(`/conversations/rename/${conversationId}`, { title })
  return res.data
}


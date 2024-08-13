import React from 'react'

type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = ({params:{chatId}}: Props) => {
  return (
    <div>ChatPage: {chatId}</div>
  )
}

export default ChatPage
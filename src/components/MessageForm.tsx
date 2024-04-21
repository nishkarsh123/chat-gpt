"use client"
import { useMessages } from '@/context/chatMessage'
import React, { useState } from 'react'
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

function MessageForm() {
    const [content, setContent] = useState('')
    const [message,setMessage]=useState<string[]>([])
    const {addMessage}=useMessages();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (content !== undefined) {
        setMessage((prev) => [...prev, content])
      }
  
      if (!content) {
        return
      }
      addMessage(content);
      setContent('')
    }
  
  return (
    <Box m={2} position={"fixed"} bottom={0} width={"45%"}>
      <form onSubmit={handleSubmit}>
        <Box>
      <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder='Type your message here'
          fullWidth
          onChange={(e) => setContent(e.target.value)}
        />
        <Button sx={{mt:2}} variant="contained" fullWidth type="submit">Send</Button>
        </Box>
      </form>
    </Box>
  )
}

export default MessageForm
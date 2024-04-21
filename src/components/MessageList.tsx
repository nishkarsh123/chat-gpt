"use client"
import { useMessages } from '../context/chatMessage'
import Box from "@mui/material/Box";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
const MessagesList = () => {
   const { messages, isLoadingAnswer } = useMessages()
  return (
    <Box color={"black"} width={"100%"}>
      {messages?.map((message, i) => {
        const isUser = message.role === 'user'
        if (message.role === 'system') return null
        return (
          <Box width={"100%"} key={i}>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            {!isUser  ?(
              <SmartToyIcon sx={{ fontSize: 40 }} />
            ): <PersonIcon sx={{ fontSize: 40 }} />}
            <Typography>
              {message.content.trim()}
            </Typography>
         </Box>
         <Divider sx={{m:2}}/>
          </Box>
        )
      })}
      {isLoadingAnswer && (
        <Box>
         <CircularProgress/>
        </Box>
      )}
      
    </Box>
  )
}

export default MessagesList
import React from 'react'
import Box from "@mui/material/Box";
import MessagesList from '@/components/MessageList';
import MessageForm from '@/components/MessageForm';
function page() {
  return (
    <Box sx={{ display: 'flex', backgroundColor:"grey" }} justifyContent={'center'} >
      <Box sx={{backgroundColor:"white", width:"50vw", height:"100vh", display:"flex",flexDirection:"column",justifyContent:"space-between"}}>     
       <MessagesList/>
       <MessageForm/>
      </Box>
    </Box>
  )
}

export default page
import React from 'react';
import MenuBar from '../../Components/NavBar/MenuBar';
import ChatSideBar from './ChatSideBar';
import ChatArea from './ChatArea';
import TextInput from './TextInput';
import { useLocation } from 'react-router-dom';

function Chat() {
  const location = useLocation();
  const friendUsername = location.state?.friendUsername;
  const profilePicture = location.state?.profilePicture
  
  return (
    <div className='flex h-custom'>

  <MenuBar />

  
  <div className='w-96 h-custom2'> 
    <ChatSideBar selectedUsername={friendUsername} profilePicture={profilePicture} />
  </div>

 
  <div className='flex flex-col flex-1 pt-12'>
    
    <div className='flex-1'>
      <ChatArea  selectedUsername={friendUsername}/>
    </div>
    
    
  </div>
</div>

  );
}

export default Chat;

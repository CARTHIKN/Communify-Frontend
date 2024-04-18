import React,{useState} from 'react'
import MenuBar from '../../Components/NavBar/MenuBar'
import SideBar from '../../Components/NavBar/Sidebar'

import PostUpload from './PostUpload'
import PostView from './PostView'
import { useSelector } from 'react-redux'

function Home() {
  const isAuthenticated = useSelector((state) => state.authentication_user.isAuthenticated);
  console.log("homeeeeee", isAuthenticated)

    
    const [toggle, setToggle] = useState(false)
    const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <div >
            <MenuBar setToggle={setToggle} toggle = {toggle}/>
        

        <div className='mr-40 '>
            <SideBar toggle={toggle}/>
        </div>
       
        
        <div className='pt-12 mt-2 sm:mt-12 sm:ml-20 sm:pl-20 md:mt-10 md:ml-22 md:mr-auto md:pt-2 md:pl-20 lg:pt-4 lg:ml-5 lg:mr-40 '>
            <PostUpload toggle={toggle} setRefreshPosts={setRefreshPosts} />
        </div>

        <div className='sm:ml-20 sm:pl-20 md:ml-22 md:mr-auto  md:pl-20 lg:ml-5 lg:mr-40'>
          <PostView refreshPosts={refreshPosts}/>
        </div>

       
        
        
        
        
      
    </div>
  )
}

export default Home

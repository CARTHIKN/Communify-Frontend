import React from 'react';
import SideBar from '../../Components/NavBar/Sidebar';
import MenuBar from '../../Components/NavBar/MenuBar';
import ProfileWithBio from './ProfileWithBio';
import ProfilePost from './ProfilePost';

function UserProfile() {
  
  return (
    <div>

      <div>
        <MenuBar/>
      </div>

      <div className='mr-40 '>
        <SideBar />
      </div>

      <div className='pt-12 w- sm:mt-12 sm:ml-20 sm:pl-20 md:mt-10 md:ml-22 md:mr-auto md:pt-2 md:pl-20 lg:pt-16'>
        <ProfileWithBio/>
      </div>
      <div className='sm:ml-20 sm:pl-20 md:ml-22 md:mr-auto  md:pl-80 lg:ml-5 lg:mr-40'>
        <ProfilePost/>
      </div>

        
      
    </div>
  );
}

export default UserProfile;

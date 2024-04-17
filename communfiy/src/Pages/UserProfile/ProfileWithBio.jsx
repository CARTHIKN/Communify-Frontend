import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userimg from "../../images/user.png"


function ProfileWithBio() {
    const username = useSelector((state) => state.authentication_user.username);
    const [userData, setUserData] = useState(null);
    const baseUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const res = await axios.get(`${baseUrl}/api/user-profile-picture/${username}/`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.status === 200) {
              
              setUserData(res.data)
            }
            return res;
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
      
        fetchUserProfile();
      }, [baseUrl, username]);
    
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="px-3 py-2">
          <div className="flex flex-col gap-1 text-center">
          <img
              className="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg"
              href=""
              src={userData? userData.profile_picture? userData.profile_picture: userimg :userimg}
            />
            <p className="font-serif font-semibold">{username}</p>
            <span className="text-sm text-gray-400">{userData? userData.bio? userData.bio: " " :" "}</span>
            <span className="text-sm text-gray-400">{userData? userData.dob? userData.dob: " " :" "}</span>
            
          </div>

          <div className="flex justify-center items-center gap-2 my-3">
            <div className="font-semibold text-center mx-4">
              <p className="text-black">102</p>
              <span className="text-gray-400">Posts</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">1M</p>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">102</p>
              <span className="text-gray-400">Following</span>
            </div>
          </div>

          <div className="flex justify-center gap-2 my-5">
            <Link to="/user-profile-edit">
            <button className="bg-zinc-800 px-5 py-1 rounded-full text-white shadow-lg">Edit</button>
            </Link>
          </div>

          
        </div>

        {/* <div className="flex justify-between items-center bg-yellow-600 bg-opacity-20 px-10 py-5 rounded-full text-gray-500">
       
        </div> */}

      </div>
    </div>
  )
}

export default ProfileWithBio

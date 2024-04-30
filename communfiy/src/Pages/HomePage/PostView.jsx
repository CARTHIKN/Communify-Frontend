import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userimg from "../../images/user.png";
import { useSelector } from 'react-redux';

function PostView({ refreshPosts }) {
 const username = useSelector((state) => state.authentication_user.username);
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [profileImages, setProfileImages] = useState({}); // State for profile images
 const navigate = useNavigate();
 const baseUrl = 'http://127.0.0.1:8001';

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(baseUrl + '/api/home/post-lists/');
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (typeof res.data === 'object') {
          setPosts(res.data.posts);
        } else {
          console.log("Unexpected data format:", res.data);
        }
        setLoading(false);
        if (res.status === 200) {
          navigate('/home');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
 }, [refreshPosts]);

 useEffect(() => {
    const fetchProfileImages = async () => {
      const images = {};
      for (const post of posts) {
        const imageUrl = await fetchUserProfile(post.username);
        images[post.username] = imageUrl || userimg; // Default to userimg if not available
      }
      setProfileImages(images); // Update the state with fetched images
    };

    if (posts.length > 0) {
      fetchProfileImages();
    }
 }, [posts]); // Depend on posts to re-fetch when posts change

 const fetchUserProfile = async (username) => {
    try {
      const userProfileResponse = await axios.get(`http://127.0.0.1:8000/api/accounts/user-profile-picture/${username}`);
      return userProfileResponse.data.profile_picture;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
 };

 const handleUsernameClick = (others_username) => {
    if (others_username === username) {
      navigate('/user-profile');
    } else {
      navigate(`/friend-profile/${others_username}`);
    }
 };

 if (loading) {
    return <div>Loading...</div>;
 }

 return (
    <div className="w-full flex flex-row flex-wrap justify-center bg-zinc-200 ">
      <div className="w-full h-auto flex flex-row flex-wrap justify-center bg-zinc-200">
        <div className="w-full md:w-3/4 lg:w-4/5  pb-3 pl-3 pr-3 md:px-12 lg:24 h-auto antialiased bg-zinc-200 ">
          <div className="mt-3 flex flex-col rounded-lg ">
            {posts.map((post, index) => (
              <div key={index} className="bg-white mt-3 pt-2 px-2 pb-2 bg-green rounded-lg">
                <div className="bg-white mb-2 pl-3 text-xl text-gray-700 font-semibold flex items-start">
                 <img
                    className="w-7 h-7 mt- rounded-full object-cover object-center"
                    src={profileImages[post.username] || userimg} // Use the state for the src
                    alt="user photo"
                 />
                 <div className='pl-2 mt-' onClick={() => handleUsernameClick(post.username)}>
                    <a href="#" className="text-zinc-500 text-lg">{post.username}</a>
                 </div>
                </div>
                {post.image_url && (
                 <img
                    src={`data:image/jpeg;base64,${post.image_url}`} // Assuming Base64 encoded JPEG
                    alt={post.caption}
                    className="w-full rounded-lg"
                 />
                )}
                
                <div className="flex ">
                  <div className=" pt-3 pl-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
     
                  </div>
                  <div className="pt-3 pl-2 pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </div>
              



                </div>
                <div className=' ml-2  flex items-start'>
                 <div className='mr-2'> {post.username}</div>
                 {post.caption}  
                </div>

                <div className="bg-white ml-2 pb-1 text-gray-700 text-xs font-semibold flex items-start">
                {post.created_at}
                </div>
                {/* <div className="bg-white p-1 border shadow flex flex-row flex-wrap">
                 <div className="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
                 <div className="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
                 <div className="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
                </div>
                <div className="bg-white border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
                 <div className="w-full">
                    <div className="w-full text-left text-xl text-gray-600">
                      @Some Person
                    </div>
                    {post.caption}
                 </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
 );
}

export default PostView;

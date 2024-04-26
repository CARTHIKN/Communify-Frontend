import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ProfilePost() {
  const username = useSelector((state) => state.authentication_user.username);
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://127.0.0.1:8001";

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(baseUrl +`/api/user/posts/?username=${username}`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [username]);

  const handlePostClick = (post) => {
    console.log('Clicked Post:', post);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <button className="w-full py-2 border-b-2 border-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 my-3">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} to={{ pathname: `/user/post/${post.id}`, state: { post } }} onClick={() => handlePostClick(post)}>
              <div>
                <a
                  className="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
                  href="#"
                  style={{ backgroundImage: `url('data:image/jpeg;base64,${post.image_url}')` }}
                ></a>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePost;

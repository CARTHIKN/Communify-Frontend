import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import MenuBar from '../../Components/NavBar/MenuBar';
import SideBar from '../../Components/NavBar/Sidebar';

function UserPostView() {
  const location = useLocation();
  const postId = location.pathname.split('/').pop(); 
  const [post, setPost] = useState(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate(); 
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Prevent scrolling on the body when the component mounts
    document.body.style.overflow = 'hidden';

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/home/post/${postId}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (postId) {
      fetchPost();
    }

    // Reset scrolling on the body when the component unmounts
    // return () => {
    //   document.body.style.overflow = 'auto';
    // };
  }, [postId]);

  const handleEdit = () => {
    navigate(`/post/edit/${postId}`); // Redirect to edit page using navigate
  };

  const handleDelete = async () => {
    setShowConfirmation(true); // Show confirmation modal before deleting
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8001/api/home/post/${postId}/delete/`);
      setShowConfirmation(false); // Hide confirmation modal after successful deletion
      navigate('/user-profile'); // Redirect to user profile after successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Hide confirmation modal if user cancels deletion
  };

  return (
    <div className="bg-zinc-200 h-auto">
      <MenuBar setToggle={setToggle} toggle={toggle} />

      <div className='mr-40'>
        <SideBar toggle={toggle} />
      </div>

      <div className='ml-8 sm:ml-20 mt-12 sm:pl-20 md:ml-22 md:mr-auto md:pl-20 lg:ml-5 lg:mr-40 flex-grow'>
        <div className="w-full flex flex-row flex-wrap justify-center bg-zinc-200 ">
          <div className="w-full h-auto flex flex-row flex-wrap justify-center bg-zinc-200">
            <div className="w-full md:w-3/4 lg:w-4/5  pb-3 pl-3 pr-3 md:px-12 lg:24 h-auto antialiased bg-zinc-200 ">
              <div className="mt-3 flex flex-col rounded-lg ">
                <div className="bg-white mt-3 pt-2 px-2 pb-2 bg-green  rounded-lg">
                  <div className="bg-white mb-2 pl-3 text-xl text-gray-700 font-semibold flex items-start"></div>
                  {post ? (   
                    <>
                      <img
                        src={post.image_url}
                        alt="Post"
                        className="rounded-lg mt-5  h-custom3 w-full ml-2 pr-3 object-cover"
                      />
                      <div className="flex ">
                        <div className=" pt-3 pl-2 ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </div>
                        <div className="pt-3 pl-2 pb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                          </svg>
                        </div>
                      </div>
                      <div className=' ml-2  flex items-start'>
                        <div className='mr-2'>{post.username}</div>
                        {post.caption}
                      </div>
                      <div className="bg-white  ml-2 pb-1 text-gray-700 text-xs font-semibold flex items-start">
                        {post.created_at}
                      </div>
                      <div className="flex ml-2 mt-2">
                        <button onClick={handleEdit} className="flex items-center mr-2 px-3 py-1 bg-blue-500 text-white rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Edit
                        </button>
                        <button  onClick={handleDelete} className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                      <p>Loading post...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-3">Are you sure you want to delete this post?</p>
            <div className="flex justify-center">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-3">Yes</button>
              <button onClick={cancelDelete} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPostView;
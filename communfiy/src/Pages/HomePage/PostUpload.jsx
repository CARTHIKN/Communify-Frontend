import { IoImageOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5'; 
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PostUpload = (props) => {

 const username = useSelector((state) => state.authentication_user.username);
 const [image, setImage] = useState(null);
 const [key, setKey] = useState(0);
 const [isSidebarOpen, setIsSidebarOpen] = useState(props.toggle);
 const [selectedImage, setSelectedImage] = useState(null);
 const [caption, setCaption] = useState('');
 const navigate = useNavigate()
 const baseUrl = "http://127.0.0.1:8001";
 useEffect(() => {
  
  setIsSidebarOpen(props.toggle);
 
}, [props.toggle, caption, key]);

 const handleCaptionChange = (e) => {
  setCaption(e.target.value);
 };

 const handleSubmit = async (e) => {
  

    e.preventDefault(); 
    const imageToSend = image
    const formData = new FormData();
    formData.append('image', imageToSend); // Assuming 'image' is the File object selected by the user
    formData.append('caption', caption);
    formData.append('username', username)

    console.log('FormData before Axios:', formData);
    
    console.log(formData)
    
    try {
      
      const res = await axios.post(baseUrl + "/api/create-post/", formData, { 
      });
      console.log(res)
      if (res.status === 201) {
        props.setRefreshPosts(prev => !prev);
        setImage(null)
        setSelectedImage(null)
        setCaption('')
        setKey(prevKey => prevKey + 1);
          navigate("/home"); 

          setCaption('')

        return res; 
      }
    } catch (error) {
      if (error.response && error.response.status === 406) {
        // setFormError(error.response.data.message);
        console.log("error")
      } else {
        console.log("error-2")
      }
    }
  };

  

 const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      

      setSelectedImage(URL.createObjectURL(e.target.files[0]));
     
    }
 };

 const handleRemoveImage = () => {
    setImage(null);
    setSelectedImage(null);
 };

 return (
  <div>
  <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <style>
    {`
      .round {
        border-radius: 50%;
      }
    `}
  </style>
  <div className="w-full flex flex-row flex-wrap justify-center">
    <div className="w-full md:w-3/4 lg:w-4/5  pt-3 pl-3 pr-3 md:px-12 lg:24 h-full antialiased">
      <div className="bg-white w-full shadow rounded-lg p-3 flex flex-row flex-wrap items-stretch">
        <div className=" md:w-ajto lg:w-auto mb-3">
          {selectedImage ? (
            <div className="flex flex-col items-center">
             <div className="flex flex-col items-center mb-3">
                <img src={selectedImage} alt="Selected Image" className="lg:w-auto pl-52 pr-52 lg:h-auto sm:w-20 md:w-20 rounded-md    mr-3" />
                <button type="button" className="bg-zinc-800 hover:bg-indigo-300 text-white p-1 rounded-lg mt-3" onClick={handleRemoveImage}>Cancel</button>
             </div>
             <div className="w-full md:w-auto lg:flex-grow mb-3 flex flex-row items-center">
              <textarea className="bg-gray-200 w-96 rounded-lg shadow border ml- mr-1 p-2 h-20 flex-grow" rows="5" value={caption} onChange={handleCaptionChange} placeholder="Caption for your post"></textarea>
              <div className="ml-3">
                  <button type="button" className="bg-zinc-800 hover:bg-indigo-300 text-white p-2 rounded-lg" onClick={handleSubmit}>Submit</button>
              </div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-zinc-500 bg-gray-50 p-2 h-20 sm:w-20 shadow-md w-20">
             <label htmlFor="upload" className="flex flex-col items-center gap- cursor-pointer">
                <IoImageOutline size={20} />
                <span className="text-gray-600 font-medium">New Post</span>
             </label>
             <input id="upload" type="file" className="hidden" onChange={handleImageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
);


};

export default PostUpload;

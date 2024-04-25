import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import user2 from "../../images/user2.jpg";

function ChatSideBar({ selectedUsername, profilePicture, onUserClick }) {
  const username = useSelector((state) => state.authentication_user.username);
  const [chatrooms, setChatRooms] = useState([]);
  const [opened, setOpened] = useState(selectedUsername ? selectedUsername : null);
  const [userProfiles, setUserProfiles] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const baseUrl2 = "http://127.0.0.1:8001";
  const baseUrl3 = "http://127.0.0.1:8002";

  useEffect(() => {
    const fetchChatRooms = async () => {
      const formData = { username: username };
      try {
        const res = await axios.post(baseUrl3 + '/api/chatrooms/', formData);

        if (res.status === 200) {
          setChatRooms(res.data);

          const profilePromises = res.data.map(async (user) => {
            try {
              const profileRes = await axios.get(`http://127.0.0.1:8000/api/user-profile-picture/${user.username}`);
              return { ...user, profilePicture: profileRes.data.profile_picture };
            } catch (error) {
              console.error(`Error fetching profile picture for user ${user.username}:`, error);
              return { ...user, profilePicture: null };
            }
          });

          const profiles = await Promise.all(profilePromises);
          const userProfileMap = profiles.reduce((acc, profile) => {
            acc[profile.username] = profile;
            return acc;
          }, {});

          setUserProfiles(userProfileMap);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [baseUrl3, username]);
  useEffect(() => {
    if (selectedUsername && chatrooms.some(user => user.username === selectedUsername)) {
      setOpened(selectedUsername);
      onUserClick(selectedUsername);

    }
  }, [chatrooms, selectedUsername]);

  const handleUserClick = (username) => {
    setOpened(username);
    onUserClick(username);
  };

  const handleUserClick2 = () => {
    setOpened(selectedUsername);
    onUserClick(selectedUsername); 
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = chatrooms.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full border-r-2 border-zinc-400 mt-16 overflow-y-auto max-h-screen">
      <div className="border-b-2 border-zinc-400 py-4 px-2 sticky top-0 bg-zinc-200 z-10">
        <input
          type="text"
          placeholder="Search chat"
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col">
      {selectedUsername && !chatrooms.some(user => user.username === selectedUsername) && !searchQuery && (
  <div
    onClick={handleUserClick2}
    style={{ cursor: 'pointer' }}
    className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-zinc-300 ${opened === selectedUsername ? 'bg-blue-200' : ''}`}
  >
    <div className="w-1/4">
      {profilePicture ? (
        <img
          src={profilePicture}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      ) : (
        <img
          src={user2}
          className="object-cover h-12 w-12 rounded-full"
          alt="Default Profile"
        />
      )}
    </div>
    <div className="w-full">
      <div className="text-lg font-semibold">{selectedUsername}</div>
      <span className="text-gray-500">Pick me at 9:00 sdfsdAM</span>
    </div>
  </div>
)}

        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-zinc-300 ${opened === user.username ? 'bg-blue-200' : ''}`}
            onClick={() => handleUserClick(user.username)}
            style={{ cursor: 'pointer' }}
          >
            <div className="w-1/4">
              {userProfiles[user.username] && userProfiles[user.username].profilePicture ? (
                <img
                  src={userProfiles[user.username].profilePicture}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              ) : (
                <img
                  src={user2}
                  className="object-cover h-12 w-12 rounded-full"
                  alt="Default Profile"
                />
              )}
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">{user.username}</div>
              <span className="text-gray-500">{user.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSideBar;

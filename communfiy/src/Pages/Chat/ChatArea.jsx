import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

function ChatArea({ selectedUsername }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');
  const [roomName, setRoomName] = useState(null);
  const baseUrl = "http://127.0.0.1:8002";
  const username = useSelector((state) => state.authentication_user.username);
  const wsBaseUrl = "ws://127.0.0.1:8002/ws/chat/";

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (roomName) {
      const webSocket = new WebSocket(
        `${wsBaseUrl}${roomName}/${username}/`
      );

      // WebSocket event listeners
      webSocket.onopen = () => {
        console.log('WebSocket connection established.');
        try {
          // Send the message to the WebSocket consumer after connection is established
          webSocket.send(JSON.stringify({ message: message }));
          setMessage('');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

      webSocket.onmessage = (event) => {
        console.log('Message received:', event.data);
        // Handle incoming WebSocket messages
      };

      webSocket.onclose = () => {
        console.log('WebSocket connection closed.');
      };

      // Send the message to the WebSocket consumer
      webSocket.send(JSON.stringify({ message: message }));
      setMessage('');
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(baseUrl + '/api/findroom/', {
          params: {
            user1: username,
            user2: selectedUsername,
            message: message,
          },
        });

        if (res.status === 200) {
          setRoomName(res.data.name);
          console.log(roomName);
        }
      } catch (error) {
        if (error.response && error.response.status === 406) {
          console.log("error");
        } else {
          console.log("error-2");
        }
      }
    };

    if (selectedUsername) {
      fetchRoom();
    }
  }, [selectedUsername, username, message]);   useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(baseUrl + '/api/messages/', {
          params: {
            room: roomName,
          },
        });

        if (res.status === 202) {
          console.log(res.data);
          setMessages(res.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (roomName) {
      fetchMessages();
    }
  }, [roomName]); 



  return (
    <div>
      {selectedUsername ? (
        <div className='overflow-hidden h-custom mt-2'>
          <div className="w-full flex-1 px-5 h-full overflow-y-auto flex flex-col justify-between">
            <div className="flex flex-col mt-5">
            {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id}>
                    <p>{msg.content}</p>
                    <p>{msg.sender}</p>
                  </div>
                ))
              ) : (
                <p>No messages available.</p>
              )}
            </div>
            {/* Input field wrapper */}
            <div className="flex pl-5 pt-5 mt-10 bg-green-300 pr-2 py-4 px-2 sticky bottom-0 bg-zinc-200 z-10">
              <input
                className="w-full bg-gray-300 py-3 px-3 rounded-xl mr-4"
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={handleMessageChange}
              />
              <button
                type="button"
                onClick={handleSendClick}
                className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 me-2 mr-5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-80 text-lg text-zinc-400'>
          Select Users to chat
        </div>
      )}
    </div>
  );
}

export default ChatArea;

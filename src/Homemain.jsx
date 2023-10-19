import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app'; // Import the main Firebase module
import 'firebase/messaging'; // Import the Firebase Messaging module

const Homemain = () => {
  const [userData, setUserData] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/api/user'; // Replace with your API URL

    axios
      .get(apiUrl)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSendNotification = () => {
    // Check if a token is selected
    if (selectedToken) {
      // Initialize Firebase (if not already initialized)
      if (!firebase.apps.length) {
        const firebaseConfig = {
            apiKey: "AIzaSyCEFilYJ4a-wktMO_I-xg8qxW0C2YoPh0A",
            authDomain: "pushnotification-bbb51.firebaseapp.com",
            projectId: "pushnotification-bbb51",
            storageBucket: "pushnotification-bbb51.appspot.com",
            messagingSenderId: "333955506379",
            appId: "1:333955506379:web:f176acb983f1ccc690bb4e",
            measurementId: "G-YW99HG5K6P"
          };
        firebase.initializeApp(firebaseConfig);
      }

      const messaging = firebase.messaging();

      // Create the message to send
      const message = {
        data: {
          score: '850',
          time: '2:45',
        },
        token: selectedToken, // Use the selected token
      };

      // Send the message using Firebase Messaging
      messaging
        .send(message)
        .then((response) => {
          // Response is a message ID string.
          setMessageStatus('Successfully sent message: ' + response);
        })
        .catch((error) => {
          setMessageStatus('Error sending message: ' + error);
        });
    } else {
      setMessageStatus('Please select a registration token before sending.');
    }
  };

  return (
    <div>
      <h1>This is the Home Page</h1>
      <select onChange={(e) => setSelectedToken(e.target.value)}>
        <option value="">Select a token</option>
        {userData.map((user) => (
          <option key={user.id} value={user.token}>
            {user.token}
          </option>
        ))}
      </select>
      <button onClick={handleSendNotification}>Send Notification</button>
      <p>{messageStatus}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Token</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.token}</td>
              <td>{user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homemain;

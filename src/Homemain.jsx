import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const Homemain = () => {
  const [userData, setUserData] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [firebaseApp, setFirebaseApp] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCEFilYJ4a-wktMO_I-xg8qxW0C2YoPh0A",
      authDomain: "pushnotification-bbb51.firebaseapp.com",
      projectId: "pushnotification-bbb51",
      storageBucket: "pushnotification-bbb51.appspot.com",
      messagingSenderId: "333955506379",
      appId: "1:333955506379:web:f176acb983f1ccc690bb4e",
      measurementId: "G-YW99HG5K6P"
    };

    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);

    const messaging = getMessaging(app);

    getToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          setSelectedToken(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while retrieving the token:', error);
      });

    onMessage(messaging, (message) => {
      console.log('Received message:', message);
    });

    const apiUrl = 'http://localhost:3000/api/user'; // Backend API URL
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
    if (selectedToken) {
      axios.post('http://localhost:3000/send-notification', { // Backend endpoint
        token: selectedToken,
        data: {
          score: '850',
          time: '2:45',
        },
      })
      .then((response) => {
        setMessageStatus('Notification request sent.');
      })
      .catch((error) => {
        setMessageStatus('Error sending notification request: ' + error);
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

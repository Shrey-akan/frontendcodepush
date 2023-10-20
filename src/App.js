import { useEffect, useState } from 'react';
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Homemain from './Homemain';
function App() {
  const [token, setToken] = useState(null);

  async function requestPermission() {
    if ('Notification' in window) {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BHoXkcfazl49nTMB5Cne2IKxRu2gN725SUwfn_Mmou1BnRNyOYmXpyXQsJ_hJSR-EJ0IXBIeGz0Pze3YowmEmeQ" });
      setToken(token);

      const phoneNumber = "555-123-4567";



      // Usage
      const id = generateRandomId(8); // Generates an 8-character random string for id
      function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomId += characters.charAt(randomIndex);
        }

        return randomId;
      }
      console.log('token generated', token);
      sendTokenToBackend(token, id, phoneNumber);
    } else if (permission === "denied") {
      alert("You denied the permission");
    }
  }
}
  async function sendTokenToBackend(token, id, phoneNumber) {
    // Define the URL of your backend endpoint
    const backendUrl = 'http://localhost:3000/api/users'; // Update with your actual backend URL

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, id, phoneNumber }),
    });
    
    if (response.ok) {
      console.log('Token sent to the backend successfully.');
    } else {
      console.error('Failed to send the token to the backend. Status:', response.status);
      const errorText = await response.text(); // Get the error response text
      console.error('Error Response:', errorText);
    }
    
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
 <Router>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Homemain/>}/>
    
  </Routes>
 </Router>
  );
}

export default App;

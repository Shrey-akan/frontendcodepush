import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your React app. You can click the button below to go to the main page.</p>
      <Link to="/home">
        <button>Go to Main Page</button>
      </Link>
    </div>
  );
}

export default Home;

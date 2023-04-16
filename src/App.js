import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [username, setUsername] = useState('test9');
  const [shopId, setShopId] = useState('15');
  const [responseData, setResponseData] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleShopIdChange = (e) => {
    setShopId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(username, shopId);
  };

  const fetchData = async (username, shopId) => {
    try {
      const response = await axios.get(`/api/users/${username}/shops/${shopId}`);
      console.log('Response data:', response);
      setResponseData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseData(error);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange}></input><br />
          <input type="text" id="shopId" name="shopId" value={shopId} onChange={handleShopIdChange}></input><br />
          <input type="submit" value="Get shop details"></input>
        </form>
        <h4>Response from API endpoint:</h4>
      <h5>
        GET /users/{username}/shops/{shopId}
      </h5>
      <p>{JSON.stringify(responseData)}</p>
    </header>
    </div >
  );
}

export default App;

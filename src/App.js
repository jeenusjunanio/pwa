import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const NavBar = () => (
  <div className="navbar">
    <h3>Task Manager</h3>
    <Link to="/">Current Tasks</Link>
    <Link to="/completed">Completed Tasks</Link>
  </div>
);

const Template = (props) => (
  <div>
    <NavBar />
    <p className="page-info">
      {props.title}:
    </p>
    <ul className={props.status}>
        <li onClick={()=> saveToken(FAKE_TOKEN)} id="task_1">Save token</li>
        <li onClick={displayCachedToken} id="task_2">Get Token</li>
    </ul>
  </div>
);

const CACHE_NAME = "auth";
const TOKEN_KEY = "token";
const FAKE_TOKEN = "sRKWQu6hCJgR25lslcf5s12FFVau0ugi";

// Cache Storage was designed for caching
// network requests with service workers,
// mainly to make PWAs work offline.
// You can give it any value you want in this case.
const FAKE_ENDPOINT = "/fake-endpoint";

const saveToken = async (token) => {
  console.log(FAKE_ENDPOINT);
  try {
    const cache = await caches.open(CACHE_NAME);
    const responseBody = JSON.stringify({
      [TOKEN_KEY]: token
    });
    const response = new Response(responseBody);
    await cache.put(FAKE_ENDPOINT, response);
    alert("Token saved! 🎉 " +token);
  } catch (error) {
    // It's up to you how you resolve the error
    alert("saveToken error:"+ { error });
  }
};

const getToken = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(FAKE_ENDPOINT);

    if (!response) {
      return null;
    }

    const responseBody = await response.json();
    return responseBody[TOKEN_KEY];
  } catch (error) {
    // Gotta catch 'em all
    console.log("getToken error:", { error });
  }
};

const displayCachedToken = async () => {
  const cachedToken = await getToken();
  alert('token: '+cachedToken);
};

// Uncomment the line below to save the fake token
// saveToken(FAKE_TOKEN);

// displayCachedToken();


class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Template title="Current Tasks" status="Current"/>}/>
            <Route path="/completed" element={<Template title="Completed Tasks" status="Completed"/>}/>
          </Routes>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import PostDetail from './components/Post/PostDetail/PostDetail';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/posts' element={<Post />} />
        <Route path='/posts/:postId' element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;

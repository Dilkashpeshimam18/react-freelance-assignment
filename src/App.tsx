import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import PostDetail from './components/Post/PostDetail/PostDetail';
import isAuth from './components/Auth/isAuth/isAuth';

const AuthenticatedPost = isAuth(Post);
const AuthenticatedPostDetail = isAuth(PostDetail);
const AuthenticatedHome = isAuth(Home);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<AuthenticatedHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/posts' element={<AuthenticatedPost />} />
        <Route path='/posts/:postId' element={<AuthenticatedPostDetail />} />
      </Routes>
    </div>
  );
}

export default App;

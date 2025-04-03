import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import ErrorPage from "./page/ErrorPage";
import PostDetails from "./page/PostDetails";
import CreatePost from "./page/CreatePost";
import EditPost from "./page/EditPost";
import ProfilePage from "./page/ProfilePage";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/posts/post/:id" element={<PostDetails />} />
            <Route exact path="/write" element={<CreatePost />} />
            <Route exact path="/edit/:id" element={<EditPost />} />
            <Route exact path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
} 

export default App;

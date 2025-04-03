import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProfilePage() {
  const userId = useParams().id
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);
  const [message,setMessage] = useState("")
  const [posts,setPosts] = useState([])
  //console.log(user)

  const fetchUserPost = async() =>{
    try{
      const res = await axios.get(URL+'/api/posts/user/'+userId)
      console.log(res.data.user)
      setPosts(res.data.user)

    }catch(err){
      console.log(err)
    }
  }
  const fetchProfile = async () => {
    const res = await axios.get(URL + "/api/users/" + userId);
    console.log(res.data.user);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
    

  };

  const handleUserUpdate = async () =>{
    const res = await axios.put(URL + '/api/users/'+user._id,{username:username,email:email,password:password},{withCredentials:true})
    //console.log(res)
    ///alert('User updated successfully')
    setMessage("User updated successfully")
  }

  const handleUserDelete = async () =>{
    const res = await axios.delete(URL + '/api/users/'+user._id,{withCredentials:true})
    console.log(res)
    navigate("/login")
    
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [message]);

  useEffect(() => {
    fetchProfile();
    fetchUserPost()
  }, [userId]);
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex flex-col-rev ">
        {/* Left */}
        <div className="flex flex-col w-full md:w-[70%]">
          <h1 className="text-xl font-bold mb-4">Your Posts</h1>
          { posts.map((post,index)=>(
            <ProfilePosts key={index} post={post} />
          ))}
        </div>
        {/* Right */}

        <div className="flex flex-col space-y-4 md:w-[30%] w-full md:items-end ">
          <h1 className="text-xl font-bold mb-4 mr-10">Profile</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="outline-none px-4 py-2 text-black-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="outline-none px-4 py-2 text-black-500"
            placeholder="Your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="outline-none px-4 py-2 text-black-500"
            placeholder="Password"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUserUpdate}
              className="bg-black py-2 px-2 text-white rounded-lg mr-2 "
            >
              Update
            </button>
            <button
              onClick={handleUserDelete}
              className="bg-black py-2 px-2 text-white rounded-lg mr-2"
            >
              Delete
            </button>
          </div>
          <div className = "text-green-400 ">{message}</div>

        </div>
        
      </div>
    </>
  );
}

export default ProfilePage;

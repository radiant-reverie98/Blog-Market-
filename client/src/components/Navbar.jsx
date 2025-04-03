import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

function Navbar() {
    
    const [prompt,setPrompt] = useState(null)
    const {user,setUser} = useContext(UserContext)
    const {pathname}  = useLocation()
    //console.log(pathname)
    const navigate = useNavigate()
    
    const handleLogout = async() => {
      try{
        const response = axios.get(URL + '/api/auth/logout',{withCredentials:true})
        //console.log(response)
        setUser(null)
        navigate("/login")


      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      if(prompt === ""){
        navigate("/")
      }
    },[prompt,navigate])

    
  return (
    <nav className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="md:text-xl text-lg font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      <div className="flex justify-center items-center space-x-1  ">
      {pathname === "/" && <><svg onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input onChange={e => setPrompt(e.target.value)} className="outline-none px-3" placeholder="Search Posts..." type="text" /></>}
        
      </div>
      <div className="flex items-center justif-center space-x-3 md:space-x-4">
        <h3 className="text-gray-500">
          {user? <Link to="/write">Write</Link>: <Link to="/login">Login</Link>}
        </h3>
        <h3 className="text-gray-500">
          {user?<Link to={`/profile/${user._id}`}>Profile</Link>:<Link to="/register">Register</Link>}
          
          
        </h3>
        <h3 className="text-gray-500 cursor-pointer" onClick={handleLogout}>
          {user && <p>Logout</p> }
          
          
        </h3>

      </div>
    </nav>
  );
}

export default Navbar;

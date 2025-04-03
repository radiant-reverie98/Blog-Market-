import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {setUser,user} = useContext(UserContext)
  const [error,setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async() => {
    try{
      const response = await axios.post(URL + '/api/auth/login',{email,password},{withCredentials:true})
      console.log(response)

      setUser(response.data.user)
      // console.log(user)
      
      setError(false)
      navigate("/")
      
      
    }catch(err){
      setError(true)
      console.log(err)
    }
  }
  return (
    <>
    <nav className="flex items-center justify-between px-6 md:px-[200px] py-4">
          <h1 className="md:text-xl text-lg font-extrabold">
            <Link to="/">Blog Market</Link>
          </h1>
    </nav>
    <div className="w-full flex justify-center items-center h-[70vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 md:w-[25%]">
            <h1 className="text-xl font-bold text-left">Login</h1>
            
                <input onChange={e => setEmail(e.target.value)} className="w-full px-2 py-2 border-2 border-black  mb-2 outline-none" type="text" placeholder="youremail@example.com"/>
                <input onChange={e => setPassword(e.target.value)} className="w-full px-2 py-2 border-2 border-black  mb-2 outline-none" type="password " placeholder="password"/>
                <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 cursor-pointer">Login</button>
                {error && <h3 className="text-red-500 font-bold">Something went wrong</h3>}
            
            <div className="flex justify-center items-center gap-1">
                <p>Don't have an account? </p>
                <Link to="/register" className="text-blue-500 font-bold underline hover:text-red-500 cursor-pointer"> Register</Link>
            </div>

        </div>
      
    </div>
    </>
  )
}

export default Login

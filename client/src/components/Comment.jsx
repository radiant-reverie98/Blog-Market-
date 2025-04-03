import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'


function Comment({c}) {
  const {user} = useContext(UserContext)
  const [postUserId,setPostUserId] = useState(null)

  //console.log(user._id)
  const postId = useParams().id
  //console.log(postId)
  
  const navigate = useNavigate()

  const fetchUserData = async() =>{
    try{
      const res = await axios.get(URL+'/api/posts/'+postId)
      //console.log(res.data.userId)
      setPostUserId(res.data.userId)
      
      
    }catch(err){
      console.log(err)
    }
  }
  //console.log(c._id)
  const deleteComment =async (id) =>{
    try{
      const res = await axios.delete(URL+'/api/comments/'+ id,{withCredentials:true})
      console.log(res)
      //navigate("/posts/post/"+postId)
      window.location.reload(true)
      
    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchUserData()
  },[])

  console.log(postUserId)
  
  return (
    <div>
      {/* Comments */}
      <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-600">@{c.author}</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-sm text-gray-500 ">{new Date(c.updatedAt).toString().slice(4,10)}</p>
                
                <p className="text-sm text-gray-500">{new Date(c.updatedAt).toString().slice(16,21)}</p>
                <div className="flex items-center justify-center space-x-2 ">
                   {user?._id === c?.userId && <p className="rounded-lg cursor-pointer" onClick={()=>deleteComment(c._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>}
                
                </div>
              </div>
            </div>
            <p className="px-4 mt-4">{c.comment}</p>
          </div>
    </div>
  )
}

export default Comment

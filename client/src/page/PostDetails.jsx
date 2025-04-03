import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Comment from '../components/Comment'
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import Loader from "../components/Loader";
import { IF } from "../url";

import { UserContext } from "../context/UserContext";

function PostDetails() {
   const navigate = useNavigate()
  const {user} = useContext(UserContext)
  //console.log(user)
  const postId = useParams().id
  //console.log(postId.id)
  // console.log(user.id)
  //console.log(postId)
  const [post,setPost] = useState({})
  const [loader,setLoader] = useState(false)
  const [comment,setComment] = useState("")
  const [comments,setComments] = useState([])
  const fetchPost = async() =>{
    setLoader(true)
    try{
      const response = await axios.get(URL+'/api/posts/'+postId)
      //console.log(response.data.user)
      setPost(response.data)
      setLoader(false)

      
    }catch(err){
      console.log(err)
      setLoader(true)
    }
  }
  console.log(postId)
  const handleDelete = async() =>{
    try{
      const response = await axios.delete(URL +'/api/posts/'+ postId,{withCredentials:true})
      console.log(response)
      console.log(postId)
      if(response){
        navigate("/")
      }
    }catch(err){
      console.log(err)
    }
  }

  
  const fetchPostComment = async () => {
    try{
      const res = await axios.get(URL+'/api/comments/')
      //console.log(res.data.user)
      setComments(res.data.user)
      //setComment("")
    }catch(err){
      console.log(err)
    }
  }

  const handleComment = async() =>{
    const res = await axios.post(URL + '/api/comments/create',{comment:comment,author:user.username,postId:postId,userId:user._id},{withCredentials:true})
    //console.log(res)
    fetchPostComment()
    setComment("")
  }
  //console.log(post)

  useEffect(()=>{
    fetchPost(),
    fetchPostComment()
  },[postId])
  //console.log(post.userId === user._id)
  return (
    <div>
      <Navbar />
      {loader?<div className="flex justify-center items-center h-screen"><Loader/></div> :<div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
           {post.title}
          </h1>
          {post?.userId && user?._id && post.userId === user._id &&(<div className="flex items-center justify-center space-x-2 ">
            <p className="bg-gray-300 rounded-lg cursor-pointer" onClick={()=> navigate("/edit/"+ postId)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </p>
            <p className="bg-gray-300 rounded-lg cursor-pointer" onClick={handleDelete}>
              <svg
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </p>
          </div>)}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4 ">
          <div className="w-full font-bold text-gray-600">{post.username}</div>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(4,10)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <img className="w-[60vw]"
            src={IF + post.image}
          />
        <div>
          
          <p className="mt-4 text-gray-700 font-serif">
            {post.desc}
          </p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
            {post.categories && post.categories.map((cat,index)=>(
                <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">{cat}</div>
              ))}
              {/* <div className="bg-gray-300 rounded-lg px-3 py-1">Trading</div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 ">
          {/* <h3 className="mt-6 mb-4 font-semibold">Comment:</h3> */}
          {/* Comments
            {   comments.map((c,i)=>(
              <Comment key={c._id} c={c}/>
            ))}
          
          {/* Write Comment */}
          {/* <div className="flex flex-col mt-4 md:flex-row">
            <input value={comment} onChange={e => setComment(e.target.value)} className="md:w-[90%] outline-none px-4 md:mt-0 py-2  " type="text" placeholder="Write a comment"/>
            <button className="bg-black text-white px-4 py-2 md:w-[12%] rounded-lg cursor-pointer" onClick={handleComment}>Add Comment</button>
          </div>
          {console.log(comments)} */}
          
        </div>
      </div>}
    </div>
  );
}

export default PostDetails;

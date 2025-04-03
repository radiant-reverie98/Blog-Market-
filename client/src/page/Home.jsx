import React, { useContext, useEffect ,useState,} from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'
import { URL } from '../url'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'

function Home() {
  const {search} = useLocation()

  const [post,setPost] = useState([])
  const [noresult,setNoResult] = useState(false)
  const [loader,setLoader] = useState(false)
  const {user,setUser} = useContext(UserContext)
  //console.log(user)
  const fetchPost = async() =>{
    setLoader(true)
    try{
      const response = await axios.get(URL+'/api/posts/'+search)
      setPost(response.data.user)
      console.log(post)
      console.log(response.data.user)
      if(response.data.user.length === 0){
        setNoResult(true)
      }
      if(search.length === 0){
        setNoResult(false)
      }
      setLoader(false)

    }catch(err){
      //console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPost()
  },[search])
  return (
    <>
    <Navbar/>
    
    {post.length === 0 ? <div className="flex justify-center h-screen items-center text-4xl text-gray-500 font-bold">No posts available</div>: <>{loader?<div className="flex justify-center items-center h-screen"><Loader/></div>: !noresult && <div className="p-8 md:px-[200px]">
      {post.map((postCard,index)=>(
        
        
        <Link key={postCard._id} to={user?`posts/post/${postCard._id}`:"/login"}><HomePosts  post={postCard}/></Link>
      ))}



    </div>}

    {noresult && <h2 className="text-gray-500 text-3xl text-center mt-4 font-semibold">No such posts available</h2>}</>}
    </>
  )
}

export default Home

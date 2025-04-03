import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  
  const postId = useParams().id
  //console.log(postId)
  const {user} = useContext(UserContext)
  
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [image,setImage] = useState(null)
  
  const [isOpen, setIsOpen] = useState(false);
  const [cat,setCat] = useState("")
  const [cats,setCats] = useState([])
  const navigate = useNavigate()
  const fetchPost = async () =>{
    try{
      const res = await axios.get(URL+'/api/posts/'+postId )
      //console.log(res)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setCats(res.data.categories)
      setImage(res.data.image)

    }catch(err){
      console.log(err)
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();
  
    // Create a new post object with the form data
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
  
    const data = new FormData();
  
    // If there's a new image, upload it first
    if (image) {
      const filename = Date.now() + image.name;
      data.append("image", filename);
      data.append("file", image);
      post.image = filename;
    }
  
    try {
      // Step 1: Upload the image if it exists
      if (image) {
        const imgUploadResponse = await axios.post(URL + '/api/upload', data);
        console.log("Image upload successful:", imgUploadResponse);
      }
  
      // Step 2: Update the post with the form data
      const response = await axios.put(URL + '/api/posts/' + postId, post, { withCredentials: true });
      
      //console.log("Post update successful:", response);
      navigate("/posts/post/"+postId)
  
      // Optionally, navigate to the updated post page or display a success message
      // navigate("/posts/post/" + response.data.updatedPost._id);
    } catch (err) {
      console.log("Error during the update:", err);
    }
  };
  

  const addCategory = () =>{
    let updateCats = [...cats]
    updateCats.push(cat)
    setCat("")
    setCats(updateCats)
  }

  const deleteCategory = (e) =>{
    //console.log(e.target.closest('.parent').innerText)
    const delItem = e.target.closest('.parent').innerText
    const newArray = cats.filter(item => item !== delItem)
    setCats(newArray)
    
  }

  useEffect(()=>{
    fetchPost()
  },[postId])
  return (
    <div>
      <Navbar />
      <div className="px-6 mt-8">
        <h1 className="font-bold md:text-4xl mt-8">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 mt-4" onSubmit={handleEdit} action="put">
          <input value={title} onChange={e => setTitle(e.target.value)}
            type="text"
            className="px-4 py-2 outline-none border border-gray-300 rounded-lg"
            placeholder="Enter post title"
          />
          <input
            type="file"  onChange={e => setImage(e.target.files[0])}
            className="inlie w-[20%] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 file:text-sm file:font-semibold
               file:bg-black file:text-white hover:file:bg-gray-700"
          />
          <div className="flex items-center space-x-4  md:space-x-8 ">
            <input 
              className="px-4 py-2 outline-none border border-gray-300 rounded-lg w-[60%]"
              placeholder="Enter post category"  onChange={(e)=>setCat(e.target.value)}
            />
            <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer w-[5%] rounded-lg cursor-pointer">
              Add
            </div>
          </div>
          {/* Choosing Category */}
          <div className="flex">
            {cats?.map((cat,index)=>(
                <div key={index} className=" parent bg-gray-600 text-white px-2 py-2 font-bold rounded-lg mr-2 flex items-center gap-1">
                {cat}
                <svg
                  onClick = {deleteCategory}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 cursor-pointer"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </div>
            ))}
           
          </div>
          <textarea value={desc} onChange={e=> setDesc(e.target.value)}
            rows={11}
            cols={30}
            placeholder="Enter the description of your post"
            className="outline-none rounded-lg border-2 border-gray-200"
          />
          <div className="flex justify-center">
            <input 
              type="submit"
              value="Update"
              className="bg-black w-[15%] text-2xl text-white py-2 px-2 rounded-lg cursor-pointer "
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;

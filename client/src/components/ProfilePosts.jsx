import React from 'react'
import { IF } from '../url'


function ProfilePosts({post}) {
  return (
    <div>
      <div className="w-full flex mt-8 space-x-4 items-center ">
      {/* Left */}
      <div className="w-[30%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post?.image}
          className="rounded-lg"
        />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[70%]">
        <h1 className="text-xl font-bold md:mb-2 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-around md:mb-4">
          <div className="w-full">@{post.username}</div>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(4,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{post.desc}</p>
        
      </div>

    </div>
    </div>
  )
}

export default ProfilePosts

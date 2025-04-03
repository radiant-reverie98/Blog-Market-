import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <>
       <nav className="flex items-center justify-between px-6 md:px-[200px] py-4">
          <h1 className="md:text-xl text-lg font-extrabold">
            <Link to="/">Blog Market</Link>
          </h1>
    </nav> 
    <div className="flex flex-col justify-center items-center h-[65vh] space-y-6">
        <div className="text-3xl font-bold">Sorry, this page isn't available.</div>
        <div>The link you followed maybe broken or has been removed.<Link className="text-blue-400" to="/">Go back to Blog Market</Link></div>
    </div>
    </>
  )
}

export default ErrorPage

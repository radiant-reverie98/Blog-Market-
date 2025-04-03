import React from "react";

function Footer() {
  return (
    <>
    <div className="flex  justify-between mt-8 w-full bg-black text-white px-8 md:px-[200px]  text-sm  py-8 md:mt-8 ">
      <div className="flex flex-col text-white">
        <p>Featured Blog</p>
        <p>Most Viewed</p>
        <p>Readers Choice</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Forum</p>
        <p>Support</p>
        <p>Recent Posts</p>
      </div>
      <div className="flex flex-col text-white">
        <p>Privacy Policy</p>
        <p>About Us</p>
        <p>Terms & Conditions</p>
      </div>
      
    </div>
    <p className="py-2 pb-6 text-center text-white bg-black text-sm">All rights reserved @Blog Market 2025</p>
    </>
  );
}

export default Footer;

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return(
    <section className="fixed left-0 top-0 w-full p-4 z-20 bg-gray-500">
      <div className="flex place-content-end">
        <div className="flex justify-around w-[25%] pr-4">
          <Link  href="/user/login"><div className="px-4 py-2 bg-gray-200 rounded text-gray-900 font-medium cursor-pointer">Log in</div></Link>
          <Link  href="/user/register"><div className="px-4 py-2 bg-gray-200 rounded text-gray-900 font-medium cursor-pointer">Sign up</div></Link>
        </div>
      </div>
    </section>
  )
};

export default Navbar;
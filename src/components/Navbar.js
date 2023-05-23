import React from "react";

const Navbar = () => {
  return(
    <section className="fixed left-0 top-0 w-full p-4 z-20 bg-gray-500">
      <div className="flex place-content-end">
        <div className="flex justify-around w-[25%] pr-4">
          <div className="px-4 py-2 bg-gray-200 rounded text-gray-900 font-medium cursor-pointer">Log in</div>
          <div className="px-4 py-2 bg-gray-200 rounded text-gray-900 font-medium cursor-pointer">Sign up</div>
        </div>
      </div>
    </section>
  )
};

export default Navbar;
import React, { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const UserRegisterForm = () => {

  // visibility of password
  const [passwordType, setPasswordType] = useState("password");

  const toggleShowPassword = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  };

  let eyeIcon = passwordType === 'password' ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
  // end of stuff about visibility of password

  return(
    <section className="pb-14">
      
      <p className="pt-4 pb-2 text-xs text-center italic">* - required fields</p>

      <form className="w-[90%] md:w-[60%] p-6 mx-auto">

        <div className="pb-6">
          <label htmlFor='firstName' className="pl-2">Name *</label>
          <input type='text' id='firstName' className="w-[100%] border-b border-gray-900" />
        </div>

        <div className="pb-6">
          <label htmlFor='lastName' className="pl-2">Last name *</label>
          <input type='text' id='lastName' className="w-[100%] border-b border-gray-900" />
        </div>

        <div className="pb-6">
          <label htmlFor='email' className="pl-2">Email *</label>
          <input type='email' id='email' className="w-[100%] border-b border-gray-900" />
        </div>

        <div className="pb-6">
          <label htmlFor='password' className="pl-2">Password *</label>
          <div className="flex">
            <input type={passwordType} id='password' className="w-[100%] border-b border-emerald-900" />
            <div className='-ml-8 my-auto cursor-pointer' onClick={toggleShowPassword}>{eyeIcon}</div>
          </div>
          <p className="text-xs italic">Minimal length: 7 characters</p>
        </div>

        <div className="pb-10">
          <input type="checkbox" name="selectCheckbox" id="selectCheckbox" />
          <label htmlFor="selectCheckbox" className="pl-2">I accept the terms of service</label>
        </div>

        <div className="flex justify-center py-4">
          <button type="submit" className='w-[80%] outline px-6 py-4 font-medium bg-gray-700 disabled:bg-gray-500 text-zinc-200 hover:bg-gray-600'>Create an account</button>
        </div>

      </form>

    </section>
  )
};

export default UserRegisterForm;
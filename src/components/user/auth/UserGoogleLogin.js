import React from 'react';
import { signIn } from "next-auth/react";

import { BsGoogle } from 'react-icons/bs';

const UserGoogleLogin = () => {

  return(
    <section className='pt-4'>
      <div className='w-[200px] flex justify-around items-center mx-auto px-10 py-4 bg-gray-500 text-zinc-200 cursor-pointer' onClick={() => signIn('google')}>
        <BsGoogle size={30}/>
        <p className='uppercase text-lg'>Google</p>
      </div>
    </section>
  )
};

export default UserGoogleLogin;
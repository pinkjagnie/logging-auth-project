import React from 'react';

import { BsGithub } from 'react-icons/bs';

const UserGithubLogin = () => {
  return(
    <section className='pt-4'>
      <div className='w-[200px] flex justify-around items-center mx-auto px-10 py-4 bg-gray-500 text-zinc-200 cursor-pointer'>
        <BsGithub size={30}/>
        <p className='uppercase text-lg'>Github</p>
      </div>
    </section>
  )
};

export default UserGithubLogin;
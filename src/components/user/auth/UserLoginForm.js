import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const UserLoginForm = () => {
  const [createdMsg, setCreatedMsg] = useState("");

  const router = useRouter();

  // visibility of password
  const [passwordType, setPasswordType] = useState("password");

  const toggleShowPassword = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  };

  let eyeIcon = passwordType === 'password' ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
  // end of stuff about visibility of password

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  async function onSubmit(data) {
    const enteredEmail = data.email;
    const enteredPassword = data.password;

    console.log('email ' + enteredEmail);
    console.log('hasło ' + enteredPassword);
      
    // LOGGING
    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    console.log('resuuuult ' + result);

    if (!result.error) {
      // router.replace('/');
    } else {
      setCreatedMsg(result.error)
      console.log(result);
    }

    reset();
  };

  return(
    <section className="pb-14">

      {createdMsg && <div className="w-[90%] mx-auto text-bold text-center text-xl text-pink-800 pb-10">{createdMsg}</div>}
      
      <p className="pt-4 pb-2 text-xs text-center italic">* - required fields</p>

      <form className="w-[90%] md:w-[60%] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>

        <div className="pb-6">
          <label htmlFor='email' className="pl-2">Email *</label>
          <input type='email' id='email' className="w-[100%] border-b border-gray-900" {...register("email", { required: {
            value: true,
            message: 'To field is required'
          }, pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Please enter a valid email address"
          } })} />
          {errors.email && <p className="text-pink-900 italic">{errors.email.message}</p>}
        </div>

        <div className="pb-6">
          <label htmlFor='password' className="pl-2">Password *</label>
          <div className="flex">
            <input type={passwordType} id='password' className="w-[100%] border-b border-gray-900" {...register("password", { required: {
            value: true,
            message: 'This field is required'
            }, minLength: {
            value: 8,
            message: 'Minimal length: 8 characters' 
            }, maxLength: {
              value: 15,
              message: 'Maximal length: 15 characters' 
            }, pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
              message: "Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase latter, one numeric digit, one special character."
            } })} />
            <div className='-ml-8 my-auto cursor-pointer' onClick={toggleShowPassword}>{eyeIcon}</div>
          </div>
          <p className="text-xs italic">Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase latter, one numeric digit, one special character.</p>
          {errors.password && <p className="text-pink-900 italic pt-2">{errors.password.message}</p>}
        </div>

        <div className="flex justify-center py-4">
          <button type="submit" className='w-[80%] outline px-6 py-4 font-medium bg-gray-700 disabled:bg-gray-500 text-zinc-200 hover:bg-gray-600' disabled={!isDirty || !isValid}>Login</button>
        </div>

        <div className="py-4">
          <p className="text-center mx-auto"><Link href='/user/register' className='py-2 px-8 outline rounded-sm bg-slate-300 text-sm text-gray-800 cursor-pointer'>Create an account</Link></p>
        </div>

      </form>

    </section>
  )
};

export default UserLoginForm;
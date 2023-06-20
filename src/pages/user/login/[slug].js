import React from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function Hash(props) {

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    defaultValues: {
      otpcode: ''
    }
  }); 

  async function onSubmit(data) {
    const enteredOtpCode = data.otpcode;

    console.log(enteredOtpCode);

    let otpCodeIsValid;

    if(enteredOtpCode.match(props.user.otpCode)) { 
      otpCodeIsValid = true;
    } else { 
      otpCodeIsValid = false;
    }

    console.log(otpCodeIsValid)

    reset();
  };

  return(
    <section className="pt-20">
      <div className="w-[90%] md:w-[70%] mx-auto">
        <h1 className="font-bold text-3xl uppercase text-center py-10">{props.user.firstName}, please enter below your secret code:</h1>
        
        <form className="w-[90%] md:w-[60%] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>

          <div className="pb-6">
            <label htmlFor='otpcode' className="pl-2">Enter your code *</label>
            <input type='number' id='otpcode' className="w-[100%] border-b border-gray-900" {...      register("otpcode", { required: {
            value: true,
            message: 'This field is required'
            }})} />
            {errors.otpcode && <p className="text-pink-900 italic">{errors.otpcode.message}</p>}
          </div>

          <div className="flex justify-center py-4">
            <button type="submit" className='w-[80%] outline px-6 py-4 font-medium bg-gray-700 disabled:bg-gray-500 text-zinc-200 hover:bg-gray-600' disabled={!isDirty || !isValid}>Confirm</button>
          </div>
        </form>
      
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {

  const { params } = context;
  const { slug } = params;

  const response = await axios.get(
    `http://localhost:3000/api/auth/login/${slug}`
  );

  let user = response.data[0]
  
   return {
    props: {
      user: user,
      slug: slug,
    }
  };
}
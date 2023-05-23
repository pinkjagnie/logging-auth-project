import React, { useState } from "react";

import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const UserRegisterForm = () => {

  // visibility of password
  const [passwordType, setPasswordType] = useState("password");

  const toggleShowPassword = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  };

  let eyeIcon = passwordType === 'password' ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
  // end of stuff about visibility of password

  const validation = Yup.object().shape({
    selectCheckbox: Yup.bool().oneOf([true], 'Checkbox selection is required'),
  })
  const optionsForm = { resolver: yupResolver(validation) };

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      selectCheckbox: false
    }
  });

  async function onSubmit(data) {
    const enteredFirstName = data.firstName;
    const enteredLastName = data.lastName;
    const enteredEmail = data.email;
    const enteredPassword = data.password;
    const isChecked = data.selectCheckbox;

    if (!isChecked) {
      alert("Check if the form is filled in correctly! Did you remember to accept the terms of service?");
      return;
    } 

    console.log('imię ' + enteredFirstName);
    console.log('nazwisko ' + enteredLastName);
    console.log('email ' + enteredEmail);
    console.log('hasło ' + enteredPassword);
    console.log('checkbox ' + isChecked);
  };

  return(
    <section className="pb-14">
      
      <p className="pt-4 pb-2 text-xs text-center italic">* - required fields</p>

      <form className="w-[90%] md:w-[60%] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>

        <div className="pb-6">
          <label htmlFor='firstName' className="pl-2">Name *</label>
          <input type='text' id='firstName' className="w-[100%] border-b border-gray-900" {...register("firstName", { required: {
            value: true,
            message: 'This field is required'
          }})} />
          {errors.firstName && <p className="text-pink-900 italic">{errors.firstName.message}</p>}
        </div>

        <div className="pb-6">
          <label htmlFor='lastName' className="pl-2">Last name *</label>
          <input type='text' id='lastName' className="w-[100%] border-b border-gray-900" {...register("lastName", { required: {
            value: true,
            message: 'This field is required'
          }})} />
          {errors.lastName && <p className="text-pink-900 italic">{errors.lastName.message}</p>}
        </div>

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
            value: 7,
            message: 'Minimal length: 8 characters' 
            }, pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
              message: "Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase latter, one numeric digit, one special character."
            } })} />
            <div className='-ml-8 my-auto cursor-pointer' onClick={toggleShowPassword}>{eyeIcon}</div>
          </div>
          <p className="text-xs italic">Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase latter, one numeric digit, one special character.</p>
          {errors.password && <p className="text-pink-900 italic pt-2">{errors.password.message}</p>}
        </div>

        <div className="pb-10">
          <input type="checkbox" name="selectCheckbox" id="selectCheckbox" {...register('selectCheckbox')} />
          <label htmlFor="selectCheckbox" className="pl-2">I accept the terms of service</label>
          {errors.selectCheckbox && <p className="text-pink-900 italic">{errors.selectCheckbox.message}</p>}
        </div>

        <div className="flex justify-center py-4">
          <button type="submit" className='w-[80%] outline px-6 py-4 font-medium bg-gray-700 disabled:bg-gray-500 text-zinc-200 hover:bg-gray-600' disabled={!isDirty || !isValid}>Create an account</button>
        </div>

      </form>

    </section>
  )
};

export default UserRegisterForm;
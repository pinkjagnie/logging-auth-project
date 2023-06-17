import React from "react";
import Link from "next/link";

import axios from "axios";

export default function Hash(props) {

  return(
    <section className="pt-20">
      <div className="w-[90%] md:w-[70%] mx-auto">
        <h1 className="font-bold text-3xl uppercase text-center py-10">{props.user.firstName}, thank you for confirming your registration!</h1>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-xl text-center pb-10">You can now log into your account</p>
          <Link href="/user/login"><div className="px-4 py-2 bg-gray-200 rounded text-gray-900 font-medium cursor-pointer">Log into your account</div></Link>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {

  const { params } = context;
  const { slug } = params;

  const response = await axios.get(
    `http://localhost:3000/api/auth/confirm/${slug}`
  );
  let user = response.data[0]

  await axios.patch(`http://localhost:3000/api/auth/confirm/${slug}`, { active: true })
  
  // await fetch(`http://localhost:3000/api/auth/confirm/${slug}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     active: true,
  //   })
  // });
  
   return {
    props: {
      user: user,
      slug: slug,
    }
  };
}
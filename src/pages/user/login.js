import React from "react";

import UserLoginForm from "@/components/user/auth/UserLoginForm";
import UserGithubLogin from "@/components/user/auth/UserGithubLogin";

const UserLoginPage = () => {
  return(
    <section className="pt-20 pb-10 min-h-screen">
      <div>
        <h1 className="py-4 text-xl text-center font-medium">Login to your account</h1>
      </div>
      <UserLoginForm />
      <div>
        <h1 className="text-center text-2xl font-bold">OR LOGIN WITH</h1>
      </div>
      <UserGithubLogin />
    </section>
  )
};

export default UserLoginPage;
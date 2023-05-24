import React from "react";

import UserLoginForm from "@/components/user/auth/UserLoginForm";

const UserLoginPage = () => {
  return(
    <section className="pt-20 min-h-screen">
      <div>
        <h1 className="py-4 text-xl text-center font-medium">Login to your account</h1>
      </div>
      <UserLoginForm />
    </section>
  )
};

export default UserLoginPage;
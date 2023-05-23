import React from "react";

import UserRegisterForm from "@/components/user/register/UserRegisterForm";

const UserRegisterPage = () => {
  return(
    <section className="pt-20 min-h-screen">
      <div>
        <h1 className="py-4 text-xl text-center font-medium">Create an account</h1>
      </div>
      <UserRegisterForm />
    </section>
  )
};

export default UserRegisterPage;
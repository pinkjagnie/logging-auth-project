import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useAuth(shouldRedirect) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: '/user/login', redirect: shouldRedirect });
    }

    if (session === null) {
      if (router.route !== '/user/login') {
        router.replace('/user/login');
      }
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      if (router.route === '/user/login') {
        router.replace('/');
      }
      setIsAuthenticated(true);
    }
  }, [session]);

  return isAuthenticated;
}
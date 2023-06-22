import React, { useState } from 'react';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { SessionProvider } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import RefreshTokenHandler from '@/components/user/auth/RefreshTokenHandler';

import '@/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [interval, setInterval] = useState(0);
  
  return(
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY}
      // useEnterprise="[optional_boolean_value]"
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: 'head', // optional, default to "head", can be "head" or "body",
        nonce: undefined // optional, default undefined
      }}
    >
      <SessionProvider session={session} refetchInterval={interval}>
        <Navbar />
        <Component {...pageProps} />
        <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
    </GoogleReCaptchaProvider>
  )
}

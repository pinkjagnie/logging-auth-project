import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import mongoose from 'mongoose';
import User from '../../../../models/User';
import connectToDatabase from '../../../../lib/db';
import { verifyPassword } from '../../../../lib/auth';
import { sendOtpCodeEmail } from '../../../../lib/auth';

import axios from 'axios';

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(process.env.NEXT_BASE_URL + 'auth/refreshToken', {
      token: tokenObject.refreshToken
    });

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken
    }
  } catch (error) {
      return {
        ...tokenObject,
        error: "RefreshAccessTokenError",
      }
  }
}

export default NextAuth({
  //Configure JWT
  session: {
    strategy: 'jwt',
  //   // maxAge: 24 * 60 * 60 // 24 hours
  //   maxAge: 2 * 60
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email })
        console.log('user  zloginu nextauth ' + user)
        
        if (!user) {
          mongoose.connection.close();
          throw new Error('No such email found. This user is not registered')
        }

        if (user.active === false) {
          throw new Error('You are not authenticated. Did you confirm your registration by clicking link in send email?')
        } else if (user.active === true) {
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            mongoose.connection.close();
            throw new Error('Incorrect password')
          } else {
            

            const userrrrrrr = await axios.post(process.env.NEXT_BASE_URL + 'auth/login', {
              password: credentials.password,
              email: credentials.email
            });

            if (userrrrrrr.data.accessToken) {
              return userrrrrrr.data;
            }


            sendOtpCodeEmail(user.email, user.firstName, user.userID)
          }
        }        
     
        mongoose.connection.close();

        return { email: user.email };
      },
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    })
  ],
  jwt: async ({ token, userrrrrrr }) => {
    if (userrrrrrr) {
      // This will only be executed at login. Each next invocation will skip this part.
      token.accessToken = userrrrrrr.data.accessToken;
      token.accessTokenExpiry = userrrrrrr.data.accessTokenExpiry;
      token.refreshToken = userrrrrrr.data.refreshToken;
    }

    // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
    const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());

    // If the token is still valid, just return it.
    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    }

    // If the call arrives after 23 hours have passed, we allow to refresh the token.
    token = refreshAccessToken(token);
    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.accessToken = token.accessToken;
    session.accessTokenExpiry = token.accessTokenExpiry;
    session.error = token.error;

    return Promise.resolve(session);
  },
  secret: process.env.JWT_SECRET
});
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import mongoose from 'mongoose';
import User from '../../../../models/User';
import connectToDatabase from '../../../../lib/db';
import { verifyPassword } from '../../../../lib/auth';

export default NextAuth({
  //Configure JWT
  session: {
    strategy: 'jwt',
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email })
        console.log(user)
        
        if (!user) {
          mongoose.connection.close();
          throw new Error('No such email found. This user is not registered')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          mongoose.connection.close();
          throw new Error('Incorrect password')
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
  secret: process.env.JWT_SECRET
});
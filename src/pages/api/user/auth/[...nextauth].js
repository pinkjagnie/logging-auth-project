import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import mongoose from 'mongoose';
import User from '../../../../../models/User';
import connectToDatabase from '../../../../../lib/db';
import { verifyPassword } from '../../../../../lib/auth';

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

        // const usersCollection = client.db().collection('users');

        const user = User.findOne({email: credentials.email})
        console.log(user)

        // const user = await usersCollection.findOne({
        //   email: credentials.email,
        // });

        if (!user) {
          // client.close();
          mongoose.connection.close();
          throw new Error('Nie znaleziono takiego użytkownika!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          // client.close();
          mongoose.connection.close();
          throw new Error('Ups, coś poszło nie tak!');
        }

      
        mongoose.connection.close();

        // client.close();
        return { email: user.email };
      },
    }),
  ],
});
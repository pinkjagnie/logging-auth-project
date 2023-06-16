import mongoose from 'mongoose';

import connectToDatabase from '../../../../lib/db';
import { hashPassword } from '../../../../lib/auth';

import User from '../../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { firstName, lastName, email, password, userID, active } = data;

  await connectToDatabase();

  const existingUser = await User.findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: 'User with this email already exists! Try logging in instead' });
    mongoose.connection.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    userID: userID,
    active: active
  });

  // const validateError = newUser.validateSync();
  // console.log('validateee errrorrrrr ' + validateError);
 
  try {
    await User.create(newUser);
    res.status(201).json({ message: 'User created!' })
  } catch(err) {
    res.status(422).json({message: err})
  };

  mongoose.connection.close();
}
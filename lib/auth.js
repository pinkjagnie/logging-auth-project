import { hash, compare } from 'bcryptjs';
import axios from 'axios';

export default function validatePassword(password) {
  let passVal;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if(password.match(passRegex)) { 
    return passVal = true;
  } else { 
    return passVal = false;
  }
};

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function verifyInsertedPassword(newPassword, hashedPassword) {
  const isValid = await compare(newPassword, hashedPassword);
  console.log(isValid)
  return isValid;
}

export const sendConfirmationEmail = (enteredEmail, enteredFirstName, newId) => {
  console.log('wyjdzie mail')

  axios({
    method: 'post',
    url: process.env.NEXT_BASE_URL + '/api/auth/confirm',
    data: {
      email: enteredEmail,
      firstName: enteredFirstName,
      newId: newId
    }
  })
  
  console.log('poszedł mail')
}

export const sendOtpCodeEmail = (email, firstName, userID) => {
  console.log('wyjdzie mail z otp code');

  // TBD: generate otp code + save in db

  axios({
    method: 'post',
    url: process.env.NEXT_BASE_URL + '/api/auth/login',
    data: {
      email: email,
      firstName: firstName,
      userID: userID,
      // otpcode: otpcode
    }
  });
  
  console.log('poszedł mail z otp')
};
import { hash, compare } from 'bcryptjs';

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
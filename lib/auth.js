import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// FORGOT PASS? -> TBD
// export async function verifyPassword(password, hashedPassword) {
//   const isValid = await compare(password, hashedPassword);
//   return isValid;
// }

// export async function verifyInsertedPassword(newPassword, hashedPassword) {
//   const isValid = await compare(newPassword, hashedPassword);
//   console.log(isValid)
//   return isValid;
// }
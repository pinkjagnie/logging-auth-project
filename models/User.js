import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // first name
  firstName: {type: String, required: true, minLength: [2, 'It should be at least two characters'], maxLength: [20, 'Name should not be longer then 20 characters']},

  // last name
  lastName: {type: String, required: true, minLength: [2, 'It should be at least two characters'], maxLength: [20, 'Last name should not be longer then 20 characters']},

  // email
  email: {type: String, required: true, unique: true, match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please fill a valid email address']},

  // password
  password: {type: String, required: true, trim: true, match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase latter, one numeric digit, one special character.']},
  
  // ID
  userID: {type: String, required: true},
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
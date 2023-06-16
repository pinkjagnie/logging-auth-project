import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // first name
  firstName: {type: String, required: true, minLength: [2, 'It should be at least two characters'], maxLength: [20, 'Name should not be longer then 20 characters']},

  // last name
  lastName: {type: String, required: true, minLength: [2, 'It should be at least two characters'], maxLength: [20, 'Last name should not be longer then 20 characters']},

  // email
  email: {type: String, required: true, unique: true, match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please fill a valid email address']},

  // password
  password: {type: String, required: true, trim: true},
  
  // ID
  userID: {type: String, required: true},

  // active account
  active: {type: Boolean}
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
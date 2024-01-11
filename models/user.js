import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
  payment:{
    type:Boolean,
    default:false,
  },
  receipt:{
    type:String,
  },
  verified:{
    type:Boolean,
    default:false,
  },
  has_type:{
    type:Boolean,
    default:false
  },
  is_admin:{
    type:Boolean,
    required:true
  }
});

const User = models.User || model("User", UserSchema);

export default User;
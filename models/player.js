import mongoose,{ Schema, model, models } from 'mongoose';

const PlayerSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Username is required!'],
  },
  age:{
    type:Number,
    required: [true, 'Age is required!'],
  },
  course: {
    type: String,
    required: [true, 'Course is required!'],
  },
  is_captain:{
    type:Boolean,
    default:false
  },
  number:{
    type:Number,
    required:[true,"Number is required"]
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required:[true,'team_id is required'],
    ref:'Team'
  }
});


PlayerSchema.index({ is_captain: 1 });
const Player = models.Player || model("Player", PlayerSchema);

export default Player;
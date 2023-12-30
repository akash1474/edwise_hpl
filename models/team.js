import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const TeamSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Team Name already exists!'],
    required: [true, 'Team Name is required!'],
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:[true,'user_id is required'],
    ref:'User'
  },
  image: {
    type: String,
  },
  description:{
    type:String,
  },
  player_count:{
    type:Number,
    required:[true,'Player Count is required'],
    enum:[8,10,13]
  },
  type:{
    type:String,
    enum:['student','teacher','staff'],
    required:[true,'Team type is required']
  }
});

const Team = models.Team || model("Team", TeamSchema);

export default Team;
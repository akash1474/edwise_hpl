import { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Team Name already exists!'],
    required: [true, 'Team Name is required!'],
  },
  image: {
    type: String,
  },
  description:{
    type:String,
  }
});

const Team = models.Team || model("Team", TeamSchema);

export default Team;
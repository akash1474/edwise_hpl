import Team from '@models/team.js'
import Player from '@models/player.js'
import mongoose from 'mongoose'
import { connectToDB } from '@utils/database';


export const GET=async(req,{params})=>{
	
	try{
		await connectToDB();
		const players=await Player.find({team_id:params.id});
		if(!players){
			return new Response(err,{status:500});
		}

		return new Response(JSON.stringify({
			status:"success",
			data:[...players]
		}));

	}catch(err){
		console.log(err);
		return new Response(err,{status:500});
	}

}

export const PATCH=async(req,{params})=>{
	const {name,description}=await req.json();
	try{
		await connectToDB();
		const team=await Team.findByIdAndUpdate(params.id,{
			name,
			description
		});
		if(!team){
			return new Response("Failed to update the team info",{status:500});
		}

		return new Response(JSON.stringify(team),{status:200});

	}catch(err){
		console.log(err);
		return new Response(err,{status:500});
	}
}

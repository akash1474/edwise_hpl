import Player from '@models/player.js'
import mongoose from 'mongoose'
import { connectToDB } from '@utils/database';


export const PATCH=async(req,res)=>{
	const data=await req.json();
	try{
		await connectToDB();
		const player=await Player.findByIdAndUpdate(data._id,{
			name:data.name,
			age:data.age,
			email:data.email,
			number:data.number,
			course:data.course
		});
		if(!player){
			return new Response("Player update failed",{status:404});
		}
		return new Response(JSON.stringify(player),{status:201});
	}catch(err){
		consol.log(err);
		return new Response(err,{status:404});
	}
}

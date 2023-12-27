import Player from '@models/player.js';
import { connectToDB } from '@utils/database';

export const GET=async(req,{params})=>{
	try{
		await connectToDB();
		console.log(params.id)
		const player=await Player.findOne({team_id:params.id,is_captain:true});
		if(!player){
			return new Response("Player doesn't have a registered captain",{status:500});
		}
		return new Response(JSON.stringify(player),{status:201});
    } catch (error) {
    	console.log(error);
        return new Response("Failed to create a get captain", { status: 500 });
    }

}

export const PATCH=async(req,{params})=>{
	const {name,course,age,email,number}=await req.json();
	try{
		await connectToDB();
		const player=await Player.findByIdAndUpdate(params.id,{name,course,age,email,number});
		if(!player){
			return new Response("Captain update failed",{status:404});
		}
		return new Response(JSON.stringify(player),{status:200});
	}catch(err){
		console.log(err);
        return new Response("Failed to update captain", { status: 500 });
	}
}
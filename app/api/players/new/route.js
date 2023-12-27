import Player from '@models/player.js';
import { connectToDB } from '@utils/database';

export const POST=async(req)=>{
	const {name,course,is_captain,age,email,team_id,number}=await req.json();
	console.log(team_id)

	try{
		await connectToDB();

		const player= new Player({name,course,is_captain,age,email,team_id,number});
		await player.save();

		return new Response(JSON.stringify(player),{status:201});
    } catch (error) {
    	console.log(error);
        return new Response("Failed to create a new player", { status: 500 });
    }
}
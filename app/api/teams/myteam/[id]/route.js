import Team from '@models/team.js';
import { connectToDB } from '@utils/database';

export const GET=async(req,{params})=>{

	try{
		await connectToDB();
		console.log(params.id)
		const team=await Team.findOne({user_id:params.id});
		if(!team){
			return new Response(JSON.stringify({}),{status:404});
		}
		return new Response(JSON.stringify(team),{status:201});
    } catch (error) {
    	console.log("Error",error);
    	if(error?.code==11000){
    		return new Response("Team name is already registered!!!",{status:500});
    	}
        return new Response("Failed to create a new team", { status: 500 });
    }

}
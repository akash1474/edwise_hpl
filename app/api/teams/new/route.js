import Team from '@models/team.js';
import { connectToDB } from '@utils/database';

export const POST=async(req)=>{
	const {userId,name,desc}=await req.json();

	try{
		await connectToDB();

		const newTeam= new Team({name});
		await newTeam.save();

		return new Response(JSON.stringify(newTeam),{status:201});
    } catch (error) {
        return new Response("Failed to create a new team", { status: 500 });
    }
    
}
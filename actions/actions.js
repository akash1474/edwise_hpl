"use server";
import { revalidatePath } from 'next/cache'

import Team from '@models/team.js';
import Player from '@models/player.js';
import { connectToDB } from '@utils/database';

async function wait(ms){
	return new Promise(res=>setTimeout(res,ms));
}

export const handleTeamForm=async(formData)=>{
	console.log(formData)
	if(formData.get("type")==="new"){
		try{
			await connectToDB();
			const name=formData.get('name');
			const description=formData.get('desc');
			const player_count=formData.get('size');
			const user_id=formData.get('usr_id');
			const type="student";

			const newTeam= new Team({name,description,player_count,user_id,type});
			await newTeam.save();

			revalidatePath("/team-details");
			return {status:true,msg:"Team successfully created!"};
	    } catch (error) {
	    	console.log("Error",error);
	    	if(error?.code==11000){
	    		return { status:false,msg:"Team name is already registered!!!"}
	    	}
	        return { status:false,msg:"Failed to create new team"}
	    }

	}else{
		const name=formData.get('name');
		const description=formData.get('desc');
		const player_count=formData.get('size');
		const id=formData.get('team_id');
		try{
			await connectToDB();
			const team=await Team.findByIdAndUpdate(id,{
				name,
				description,
				player_count,
			},{
				runValidators:true
			});

			if(!team) return {msg:"Failed to update the team info",status:false};

			return {msg:"Team details updated!",status:true};

		}catch(err){
			console.log(err.message);
			return {msg:"Failed to update the team info",status:false};
		}
	}

};










export const handleCaptainForm=async(formData)=>{
	if(formData.get("type")=="new"){
		try{
			await connectToDB();

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const team_id=formData.get("team_id");
			const is_captain=true;

			const player= new Player({name,course,is_captain,age,email,team_id,number});
			await player.save();
			console.log(player);

			revalidatePath("/team-details");
			return {status:true,msg:"Captain successfully registered!"};
	    } catch (error) {
	    	console.log(error);
			return {status:false,msg:error.message};
	    }

	}else{

		try{
			await connectToDB();
			// await wait(2000);

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const captain_id=formData.get("captain_id")

			const player=await Player.findByIdAndUpdate(captain_id,{name,course,age,email,number});
			if(!player){
				return {status:false,msg:"Failed to update captain details!"};
			}
			revalidatePath("/team-details");
			return {status:true,msg:"Captain details updated!"};
		}catch(err){
			console.log(err);
			return {status:false,msg:"Failed to update captain details!"};
		}

	}
}











export const handlePlayerForm=async(formData)=>{
	if(formData.get("type")=="new"){
		try{
			await connectToDB();

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const team_id=formData.get("team_id");
			const is_captain=false;

			const player= new Player({name,course,is_captain,age,email,team_id,number});
			await player.save();

			revalidatePath("/team-details");
			return {status:true,msg:"Player added successfully!"};
	    } catch (error) {
	    	console.log(error);
			return {status:false,msg:error.message};
	    }

	}else{

		try{
			await connectToDB();

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const player_id=formData.get("player_id")

			const player=await Player.findByIdAndUpdate(player_id,{name,course,age,email,number});
			if(!player){
				return {status:false,msg:"Failed to update player details!"};
			}
			return {status:true,msg:"Player details updated!"};
		}catch(err){
			console.log(err);
			return {status:false,msg:"Failed to update player details!"};
		}

	}
}

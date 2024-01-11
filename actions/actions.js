"use server";
import { revalidatePath } from 'next/cache'

import Team from '@models/team.js';
import User from '@models/user.js';
import Player from '@models/player.js';
import { connectToDB } from '@utils/database';

export async function wait(ms){
	return new Promise(res=>setTimeout(res,ms));
}

export const handleTeamForm=async(formData)=>{
	console.log(formData)
	if(formData.get("req")==="new"){
		try{
			await connectToDB();
			const name=formData.get('name');
			const description=formData.get('desc');
			const player_count=formData.get('size');
			const user_id=formData.get('usr_id');
			const type=formData.get('type');

			const newTeam= new Team({name,description,player_count,user_id,type});
			await newTeam.save();

			await User.findByIdAndUpdate(user_id,{has_type:true});

			revalidatePath("/team-details",'page');
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
		const type=formData.get('type');
		const id=formData.get('team_id');
		try{
			await connectToDB();
			const team=await Team.findByIdAndUpdate(id,{
				name,
				description,
				player_count,
				type
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
	if(formData.get("req")=="new"){
		try{
			await connectToDB();

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const team_id=formData.get("team_id");
			const type="captain";

			const player= new Player({name,course,age,email,team_id,number,type});
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
	if(formData.get("req")=="new"){
		try{
			await connectToDB();

			const name=formData.get("name");
			const age=formData.get("age");
			const course=formData.get("course");
			const email=formData.get("email");
			const number=formData.get("number");
			const team_id=formData.get("team_id");
			const type=formData.get("type");

			const player= new Player({name,course,age,email,team_id,number,type});
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
			const type=formData.get("type");

			const player=await Player.findByIdAndUpdate(player_id,{name,course,age,email,number,type});
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

export const updateUserPaymentState=async(user_id,is_verified)=>{
	try{
		await connectToDB();
		const user=await User.findByIdAndUpdate(user_id,{
			verified:is_verified
		});

		if(!user) return { status:false,msg:"Failed to update"}
		revalidatePath("/admin/dashboard");
		return {status:true,msg:`User marked as ${is_verified ? "verified" :"pending"}!`}
	}catch(error){
		return { status:false,msg:"Failed to update"}
	}
}


export async function searchUsers(searchTerm) {
	try {
		let users = await User.find({
		  $or: [
		    { username: { $regex: new RegExp(searchTerm, 'i') } },
		    { email: { $regex: new RegExp(searchTerm, 'i') } },
		  ]
		})
		users=users.filter((usr)=>usr.is_admin===false);
		if(users.length===0){
			return {
				status:false,
				msg:"No User Found!"
			}
		}
		return {
			status:true,
			users,
		}
	} catch (error) {
		return {
			status:false,
			msg:"No User Found!"
		}
	}
}


export async function searchTeams(searchTerm) {
	try {
		const teams = await Team.find({
		    name: { $regex: new RegExp(searchTerm, 'i') }
		}).populate("user_id");

		if(teams.length===0) return { status:false, msg:"No Team Found!"}

		return {
			status:true,
			teams,
		}
	} catch (error) {
		return {
			status:false,
			msg:"No Team Found!"
		}
	}
}


export async function searchPlayers(searchTerm) {
	try {
		const players = await Player.find({
		  $or: [
		    { name: { $regex: new RegExp(searchTerm, 'i') } },
		    { course: { $regex: new RegExp(searchTerm, 'i') } },
		  ]
		})

		if(players.length===0) return { status:false,msg:"No Player Found!"}
		return {status:true,players}

	} catch (error) {
		return { status:false,msg:"No Player Found!"}
	}
}

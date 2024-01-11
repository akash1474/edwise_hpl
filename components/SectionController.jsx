"use client";
import {useState} from 'react';
import UserDetailSection from '@components/UserDetailSection';
import TeamDetailSection from '@components/TeamDetailSection';
import PlayerDetailSection from '@components/PlayerDetailSection';

const SectionController=({users,teams,players})=>{

	const defaultState={
		teams:false,
		users:false,
		players:false,
	}

	const [state,setState]=useState({
		teams:false,
		users:true,
		players:false
	})


	return (
		<>
		<div className="flex w-full justify-center">
			<div className="w-fit px-5 flex items-center ustifyjustify-between gap-5">
				<p onClick={()=>setState({...defaultState,users:true})} className={`px-5 py-1 border border-slate-400 rounded-md cursor-pointer ${state.users ? "text-white bg-black":"text-black bg-white hover:bg-slate-100"}`}>Users</p>
				<p onClick={()=>setState({...defaultState,teams:true})} className={`px-5 py-1 border border-slate-400 rounded-md cursor-pointer ${state.teams ? "text-white bg-black":"text-black bg-white hover:bg-slate-100"}`}>Teams</p>
				<p onClick={()=>setState({...defaultState,players:true})} className={`px-5 py-1 border border-slate-400 rounded-md cursor-pointer ${state.players ? "text-white bg-black":"text-black bg-white hover:bg-slate-100"}`}>Players</p>
			</div>
		</div>
		{
			state.users && <UserDetailSection data={users} />
		}
		{
			state.teams && <TeamDetailSection data={teams} />
		}
		{
			state.players && <PlayerDetailSection data={players} />
		}
		
		</>
	);
}

export default SectionController;
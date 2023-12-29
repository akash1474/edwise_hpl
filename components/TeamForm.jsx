"use client";
import {useRef,useEffect,useState} from 'react';
import InputComponent from '@components/InputComponent';
import {handleTeamForm} from '@actions/actions.js';
import toast from 'react-hot-toast';

const TeamForm=({team,user})=>{
	const formRef=useRef();
	const [isUpdating,setIsUpdating]=useState(false);


	useEffect(()=>{
		console.log(team);
		if(!team) return;
		formRef.current.name.value=team.name;
		formRef.current.desc.value=team.description;
		formRef.current.size.value=team.player_count;
		setIsUpdating(true);
	},[]);



	return (

		<form ref={formRef} action={async(formData)=>{
			if(!isUpdating){
				formData.set("usr_id",user.id);
				formData.set("type","new");
			}else{
				formData.set("team_id",team._id)
				formData.set("type","patch");
			}
			try{
				const res=await handleTeamForm(formData);
				if(res.status){
					toast.success(res.msg);
				}else{
					toast.error(res.msg);
				}

			}catch(err){
				toast.error(res.msg);
			}
		}} className="flex flex-col w-full">
		<span className="flex gap-5 flex-wrap items-center justify-between">
			<InputComponent name="name" label="Team Name" />	
			<InputComponent name="desc" label="Team Description" />	
			<div className="mb-10 w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full">
				<label className='mb-[5px] block text-base font-medium text-dark'>Select Team Type</label>
				<div className='relative w-full z-20'>
					<select name='size' className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-black outline-none transition focus:border-indigo-500 active:border-primary disabled:cursor-default disabled:bg-gray-200'>
						<option value='0' className='dark:bg-dark' default>Select</option>
						<option value='8' className='dark:bg-dark'>Micro: 6 + 2 reserve </option>
						<option value='10' className='dark:bg-dark'>Mini: 8 + 2 reserve </option>
						<option value='13' className='dark:bg-dark'>Standard: 11 + 2 reserve</option>
					</select>
					<span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
				</div>
	    	</div>
		</span>
			<button type="submit" className="btn_black w-fit rounded-sm max-md:w-full">
				{
					isUpdating ? "Update Team" : "Create Team"
				}
			</button>
		</form>

	)
}


export default TeamForm;
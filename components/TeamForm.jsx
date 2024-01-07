"use client";
import {useRef,useEffect,useState} from 'react';
import InputComponent from '@components/InputComponent';
import {handleTeamForm} from '@actions/actions.js';
import {FormSubmitButton} from '@components/ClientComponents';
import toast from 'react-hot-toast';
import {useSearchParams} from 'next/navigation';

const TeamForm=({team,user})=>{
	const formRef=useRef();
	const [isUpdating,setIsUpdating]=useState(false);
	const params=useSearchParams();
	const type=params.get('type')


	useEffect(()=>{
		console.log(team);
		if(!team) return;
		formRef.current.name.value=team.name;
		formRef.current.desc.value=team.description;
		formRef.current.size.value=team.player_count;
		if(!type) formRef.current.type.value=team.type;
		setIsUpdating(true);
	},[]);

	const handleSubmit=async(formData)=>{
		if(isUpdating){
			formData.set("team_id",team._id)
			formData.set("req","patch");
		}else{
			if(!type){
				toast.error("Team type is required");
				return;
			}
			formData.set("type",type);
			formData.set("usr_id",user.id);
			formData.set("req","new");
		}
		try{
			const res=await handleTeamForm(formData);
			if(res.status){
				toast.success(res.msg);
			}else{
				toast.error(res.msg);
			}

		}catch(err){
			toast.error("Failed to update team details");
		}
	}



	return (

		<form ref={formRef} action={handleSubmit} className="flex flex-col w-full">
			<span className="flex gap-5 flex-wrap items-center justify-between">
				<InputComponent name="name" label="Team Name" />	
				<InputComponent name="desc" label="Team Description" />
				<div className="flex max-md:flex-col w-full mt-3 items-center justify-between gap-5">
					<div className="w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full">
						<label className='mb-[5px] block text-base font-medium text-dark'>Select Team Size</label>
						<div className='relative w-full z-20'>
							<select name='size' className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-black outline-none transition focus:border-indigo-500 active:border-primary disabled:cursor-default disabled:bg-gray-200'>
								<option value='0' className='dark:bg-dark' default>Select</option>
								<option value='8' className='dark:bg-dark'>8 Players (6 + 2 reserve )</option>
								<option value='10' className='dark:bg-dark'>10 Players (8 + 2 reserve) </option>
								<option value='13' className='dark:bg-dark'>13 Players (11 + 2 reserve)</option>
							</select>
							<span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
						</div>
			    	</div>
			    	{
			    		!type ?
						<div className="w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full">
							<label className='mb-[5px] block text-base font-medium text-dark'>Select Team Type</label>
							<div className='relative w-full z-20'>
								<select name='type' className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-black outline-none transition focus:border-indigo-500 active:border-primary disabled:cursor-default disabled:bg-gray-200'>
									<option value='0' className='dark:bg-dark' default>Select</option>
									<option value='student' className='dark:bg-dark'>Students</option>
									<option value='teacher' className='dark:bg-dark'>Teachers</option>
									<option value='staff' className='dark:bg-dark'>Staff</option>
								</select>
								<span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
							</div>
				    	</div>
				    	:null
			    	}
				</div>
			</span>
			<FormSubmitButton text={isUpdating ? "Update Team" : "Create Team"} />
		</form>

	)
}


export default TeamForm;
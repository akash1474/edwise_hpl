"use client";
import {useRef,useEffect,useState} from 'react';
import InputComponent from '@components/InputComponent';
import {handlePlayerForm} from '@actions/actions.js';
import toast from 'react-hot-toast';
import {FormSubmitButton} from '@components/ClientComponents';
import {useRouter} from 'next/navigation';
import CheckBox from '@components/CheckBox';


const PlayerForm=({team,player,isUpdating,player_count})=>{
	const formRef=useRef();
	const router=useRouter();


	useEffect(()=>{
		if(!player) return;
		formRef.current.name.value=player.name;
		formRef.current.age.value=player.age;
		formRef.current.course.value=player.course;
		formRef.current.number.value=player.number;
		formRef.current.email.value=player.email;
		formRef.current.type.value=player.type;
	},[]);

	return (

		<form ref={formRef} action={async(formData)=>{
			if(!(formData.get("number").toString().length===10)){
				toast.error("WhatsApp/Mobile number should be of 10 digits");
				return;
			}
			if(parseInt(formData.get("age"))>70){
				toast.error("Player Age is greater than 70 years");
				return;
			}
			if(isUpdating){
				formData.set("player_id",player._id)
				formData.set("req","patch");
			}else{
				formData.set("team_id",team._id);
				formData.set("req","new");
			}
			if(formData.get("type")=="none"){
				toast.error("Please select a player type");
			}
			try{
				const res=await handlePlayerForm(formData);
				if(res.status){
					toast.success(res.msg);
					formRef.current.reset();
					if(isUpdating){
						router.push('/team-details');
					}
				}else{
					toast.error(res.msg);
				}

			}catch(err){
				toast.error(err);
			}
		}} className="flex flex-col">
		{
			(team && !!!isUpdating) ? <p className="text-base font-bold mb-5">{team.player_count-player_count} Players Remaining</p>:null
		}
			<span className="flex flex-wrap justify-between gap-5">
				<InputComponent name="name" label="Name" />	
				<InputComponent name="course" label="Course"  />	
				<InputComponent name="age" label="Age" type="number" />	
				<InputComponent name="number" label="WhatsApp Number" type="number"/>	
				<InputComponent name="email" type="email" label="Email" />	
				{/*<CheckBox name="type" title="Mark player as reserved?" label="Reserve Player" />*/}
				<div className="w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full">
					<label className='mb-[5px] block text-base font-medium text-dark'>Player Type</label>
					<div className='relative w-full z-20'>
						<select required name='type' className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-black outline-none transition focus:border-indigo-500 active:border-primary disabled:cursor-default disabled:bg-gray-200'>
							<option value='none' className='dark:bg-dark' default>Select</option>
							<option value='allrounder' className='dark:bg-dark'>All-Rounder</option>
							<option value='batsman' className='dark:bg-dark'>Batsman</option>
							<option value='bowler' className='dark:bg-dark'>Bowler</option>
							<option value='wicketkeeper' className='dark:bg-dark'>Wicketkeeper</option>
							<option value='reserve' className='dark:bg-dark'>Reserve</option>
						</select>
						<span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
					</div>
		    	</div>
			</span>
			<FormSubmitButton text={isUpdating ? "Update" : "Submit"} />
		</form>

	)
}


export default PlayerForm;
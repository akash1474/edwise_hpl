"use client";
import {useRef,useEffect,useState} from 'react';
import InputComponent from '@components/InputComponent';
import {handlePlayerForm} from '@actions/actions.js';
import toast from 'react-hot-toast';


const PlayerForm=({user,team})=>{
	const formRef=useRef();
	const [isUpdating,setIsUpdating]=useState(false);

	return (

		<form ref={formRef} action={async(formData)=>{
			if(formData.get("number").length>10){
				toast.error("WhatsApp/Mobile number should be of 10 digits");
				return;
			}
			if(parseInt(formData.get("age"))>70){
				toast.error("Player Age is greater than 70 years");
				return;
			}
			if(isUpdating){
				formData.set("player_id",player._id)
				formData.set("type","patch");
			}else{
				formData.set("team_id",team._id);
				formData.set("type","new");
			}
			try{
				const res=await handlePlayerForm(formData);
				if(res.status){
					toast.success(res.msg);
					formRef.current.reset();
				}else{
					toast.error(res.msg);
				}

			}catch(err){
				toast.error(err);
			}
		}} className="flex flex-col">
			<span className="flex flex-wrap justify-between gap-5">
				<InputComponent name="name" label="Name" />	
				<InputComponent name="course" label="Course"  />	
				<InputComponent name="age" label="Age" type="number" />	
				<InputComponent name="number" label="WhatsApp Number" type="number"/>	
				<InputComponent name="email" type="email" label="Email" />	
			</span>
			<button type="submit" className="btn_black w-fit rounded-sm max-md:w-full mt-5">
				{
					isUpdating ? "Update" : "Submit"
				}
			</button>
		</form>

	)
}


export default PlayerForm;
"use client";
import {useRef,useEffect,useState} from 'react';
import InputComponent from '@components/InputComponent';
import {FormSubmitButton} from '@components/ClientComponents';
import {handleTeamForm,handleCaptainForm} from '@actions/actions.js';
import toast from 'react-hot-toast';

const CaptainForm=({captain,user,team})=>{
	const formRef=useRef();
	const [isUpdating,setIsUpdating]=useState(false);


	useEffect(()=>{
		if(!captain) return;
		formRef.current.name.value=captain.name;
		formRef.current.age.value=captain.age;
		formRef.current.course.value=captain.course;
		formRef.current.number.value=captain.number;
		formRef.current.email.value=captain.email;
		setIsUpdating(true);
	},[]);



	return (

		<form ref={formRef} action={async(formData)=>{
			if(!(formData.get("number").toString().length===10)){
				toast.error("WhatsApp/Mobile number should be of 10 digits");
				return;
			}
			if(parseInt(formData.get("age"))>70){
				toast.error("Captain Age is greater than 70 years");
				return;
			}
			if(isUpdating){
				formData.set("captain_id",captain._id)
				formData.set("req","patch");
			}else{
				if(!team?._id){
					toast.error("Please create a team first");
					return;
				}
				formData.set("team_id",team._id);
				formData.set("req","new");
			}
			try{
				const res=await handleCaptainForm(formData);
				if(res.status){
					toast.success(res.msg);
					setIsUpdating(true);
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
				<InputComponent name="number" label="WhatsApp Number" type="number" maxLength={10} />	
				<InputComponent name="email" type="email" label="Email" />	
			</span>
			<FormSubmitButton text={isUpdating ? "Update" : "Submit"} />
		</form>

	)
}


export default CaptainForm;
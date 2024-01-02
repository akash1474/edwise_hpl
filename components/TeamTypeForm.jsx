"use client";
import Link from 'next/link';
import {FormSubmitButton} from '@components/ClientComponents';
import {useState} from 'react';
import {StudentIcon,TeacherIcon,StaffIcon} from '@icons';
import toast from 'react-hot-toast';
import {wait} from '@actions/actions.js';
import {useRouter} from 'next/navigation';

const TeamTypeForm=()=>{

	const [select,setSelect]=useState(null);
	const router=useRouter();

	const getType=(idx)=>{
		switch(idx){
		case 0:
			return "student";
			break;
		case 1:
			return "teacher";
			break;
		case 2:
			return "staff";
			break;
		default:
			return false;
		}
	}

	const handleForm=async(formData)=>{
		const type=getType(select);
		if(!type){
			toast.error("Please select a team type");
			return;
		}
		await wait(1000);
		router.push(`/team-details?type=${type}`);
	}


	const types=[
		{
			title:"Students",
			text:"Join forces with your classmates for an exciting cricket experience on the field."
		},
		{
			title:"Teachers",
			text:"Showcase your cricket skills and camaraderie with your fellow educators."
		},
		{
			title:"Staff",
			text:"Unite with colleagues for a fun-filled cricket match outside the workplace."
		},
	];

	return (

		<form action={handleForm} className="flex flex-col h-full items-center">
			<div className="flex flex-wrap max-md:flex-col justify-between my-5 gap-7 relative">
				{
					types.map((type,i)=><TeamType key={i} index={i} selectedIdx={select}  setSelect={setSelect} data={type} name="team_type" />)
				}
			</div>
			<p className="text-base font-medium w-full text-center w-max-[450px] mt-10">Click the Proceed button to continue your team registration process for upcoming cricket event. Get ready for a thrilling match day!</p>
			<FormSubmitButton text="Proceed" />
		</form>

	);
}


const TeamType=({data,name,setSelect,index,selectedIdx})=>{
	let dark=""
	let light=""
	switch(data.title){
	case "Students":
		light="text-emerald-200"
		dark="text-emerald-500"
		break;
	case "Teachers":
		light="text-blue-200"
		dark="text-blue-500"
		break;
	case "Staff":
		light="text-amber-200"
		dark="text-amber-500"
		break;
	}
	const isSelected=index===selectedIdx;
	return (
		<div>
			<input type="radio" className="hidden peer" id={data.title} name={name}/>
			<label 
				htmlFor={data.title}
				onClick={()=>setSelect(index)}
				className={`transition-colors duration-75 group max-md:max-w-full max-w-72 cursor-pointer rounded-sm flex flex-col items-center px-5 py-3 border border-slate-200 ${isSelected ? "border-gray-900 bg-gray-900 text-white" : "" } max-md:flex-row`}
				>
				<section className="flex flex-col items-center min-w-16">
					{getIcon(data.title,isSelected)}
					<p className={`transition-colors duration-75 text-xl mt-1 mb-2 font-bold ${isSelected ? "text-white" : dark}`}>{data.title}</p>
				</section>
				<p className={`max-md:ml-5 max-md:text-left transition-color duration-75 text-base text-center w-full ${isSelected ? light : ""}`}>{data.text}</p>
			</label>
		</div>
	)
}


const getIcon=(type,ischecked)=>{
	switch(type){
		case "Students":
			return <StudentIcon className={`max-md:h-12 max-md:w-12 h-16 w-16  ${ischecked ? "fill-emerald-500" : "" } transition-colors duration-75`} />;
			break;
		case "Teachers":
			return <TeacherIcon className={`max-md:h-12 max-md:w-12 h-16 w-16 ${ischecked ? "fill-blue-500" : "" } transition-colors duration-75`} />;
			break;
		case "Staff":
			return <StaffIcon className={`max-md:h-12 max-md:w-12 h-16 w-16 ${ischecked ? "fill-amber-500" : "" } transition-colors duration-75`} />;
			break;
	}
}

export default TeamTypeForm;
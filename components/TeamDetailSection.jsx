"use client";
import Image from 'next/image';
import {useState,useRef} from 'react';
import TeamComponent from '@components/TeamComponent';
import Dialog from '@components/Dialog';
import {updateUserPaymentState,searchTeams} from '@actions/actions';
import toast from 'react-hot-toast';
import {XMarkIcon} from '@heroicons/react/24/outline';

const TeamDetailSection=({data})=>{
	const [state,setState]=useState({
		all:true,
		eight:false,
		ten:false,
		thirteen:false,
	});

	const [isOpen,setIsOpen]=useState(false);
	const [show,setShow]=useState(false);
	const [teams,setTeams]=useState(data);
	const inputRef=useRef();

	const defaultstate={
		all:false,
		eight:false,
		ten:false,
		thirteen:false,
	}

	const handleSubmit=async(formData)=>{
		try{
			const query=formData.get("query")
			const res=await searchTeams(query);

			console.log(res);
			if(!res.status) toast.error(res.msg);

			setShow(true);
			setTeams(res.teams);
			setState({...defaultstate,all:true});
		}catch(err){
			console.error(err);
			toast.error("Failed to search details");
		}
	}

	const resetInput=()=>{
		inputRef.current.value="";
		setTeams(data);
		setShow(false);
	}


	return (
		<section className="w-4/5 flex flex-col my-10">
			<p className="text-lg font-bold">Teams</p>	
			<form action={handleSubmit}>   
			    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
			    <div className="relative">
			        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
			                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			            </svg>
			        </div>
			        <input ref={inputRef} name='query' type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 my-5 focus:ring-1 focus:ring-black focus:outline-none" placeholder="Search Team" required/>
			        {
			        	show && <button type="button" onClick={resetInput} className="text-white absolute right-24 bottom-3 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-sm px-1 py-1"><XMarkIcon className="text-white h-4 w-4"/></button>
			        }
			        <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-1.5">Search</button>
			    </div>
			</form>
			<section className="flex items-center gap-5 max-md:flex-wrap">
				<p onClick={()=>setState(()=>{ return {...defaultstate,all:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.all ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>All Teams</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,eight:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.eight ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Size:8</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,ten:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.ten ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Size:10</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,thirteen:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.thirteen ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Size:13</p>
			</section>
			<div className="flex flex-col items-center gap-5 my-5">
				{
					teams && teams.filter((data)=>{
						if(state.all) return true;
						if(state.eight) return data.player_count===8;
						if(state.ten) return data.player_count===10;
						if(state.thirteen) return data.player_count===13;
					}).map(data=><TeamComponent key={data._id} team={data} />)
				}	
			</div>
		</section>
	);
}

export default TeamDetailSection;
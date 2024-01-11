"use client";
import Image from 'next/image';
import {useState,useRef} from 'react';
import PlayerDetail from '@components/PlayerDetail';
import Dialog from '@components/Dialog';
import {updateUserPaymentState,searchPlayers} from '@actions/actions';
import toast from 'react-hot-toast';
import {XMarkIcon} from '@heroicons/react/24/outline';

const PlayerDetailSection=({data})=>{
	const [state,setState]=useState({
		all:true,
		allrounder:false,
		batsman:false,
		bowler:false,
		wicketkeeper:false,
		reserve:false,
		captain:false,
	});

	const [isOpen,setIsOpen]=useState(false);
	const [show,setShow]=useState(false);
	const [players,setPlayers]=useState(data);
	const inputRef=useRef();

	const defaultstate={
		all:false,
		allrounder:false,
		batsman:false,
		bowler:false,
		wicketkeeper:false,
		reserve:false,
		captain:false,
	}

	const handleSubmit=async(formData)=>{
		try{
			const query=formData.get("query")
			const res=await searchPlayers(query);

			console.log(res);
			if(!res.status) toast.error(res.msg);

			setShow(true);
			setPlayers(res.players);
			setState({...defaultstate,all:true});
		}catch(err){
			console.error(err);
			toast.error("Failed to search details");
		}
	}

	const resetInput=()=>{
		inputRef.current.value="";
		setPlayers(data);
		setShow(false);
	}


	return (
		<section className="w-4/5 flex flex-col my-10">
			<p className="text-lg font-bold">Players</p>	
			<form action={handleSubmit}>   
			    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
			    <div className="relative">
			        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
			                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			            </svg>
			        </div>
			        <input ref={inputRef} name='query' type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 my-5 focus:ring-1 focus:ring-black focus:outline-none" placeholder="Search Player" required/>
			        {
			        	show && <button type="button" onClick={resetInput} className="text-white absolute right-24 bottom-3 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-sm px-1 py-1"><XMarkIcon className="text-white h-4 w-4"/></button>
			        }
			        <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-1.5">Search</button>
			    </div>
			</form>
			<section className="flex items-center gap-5 max-md:flex-wrap">
				<p onClick={()=>setState(()=>{ return {...defaultstate,all:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.all ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>All Players</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,captain:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.captain ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Captain</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,batsman:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.batsman ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Batsman</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,bowler:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.bowler ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Bowler</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,allrounder:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.allrounder ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>All Rounder</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,reserve:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.reserve ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Reserve</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,wicketkeeper:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.wicketkeeper ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Wicketkeeper</p>
			</section>
			<div className="flex flex-col items-center gap-5 my-5">
				{
					players && players.filter((data)=>{
						if(state.all) return true;
						if(state.allrounder) return data.type==="allrounder";
						if(state.captain) return data.type==="captain";
						if(state.bowler) return data.type==="bowler";
						if(state.wicketkeeper) return data.type==="wicketkeeper";
						if(state.reserve) return data.type==="reserve";
						if(state.batsman) return data.type==="batsman";
					}).map(data=><PlayerDetail key={data._id} player={data} />)
				}	
			</div>
		</section>
	);
}

export default PlayerDetailSection;
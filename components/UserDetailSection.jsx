"use client";
import Image from 'next/image';
import {useState,useRef} from 'react';
import UserComponent from '@components/UserComponent';
import Dialog from '@components/Dialog';
import {updateUserPaymentState,searchUsers} from '@actions/actions';

import toast from 'react-hot-toast';
import {XMarkIcon} from '@heroicons/react/24/outline';

const UserDetailSection=({data})=>{
	const [state,setState]=useState({
		all:true,
		ppending:false,
		vpending:false,
		verified:false,
	});

	const [isOpen,setIsOpen]=useState(false);
	const [show,setShow]=useState(false);
	const [user,setUser]=useState(null);
	const [users,setUsers]=useState(data);
	const inputRef=useRef();

	const defaultstate={
		all:false,
		ppending:false,
		vpending:false,
		verified:false,
	}

	const handleVerification=async(verified)=>{
		console.log(user);
		const res=await updateUserPaymentState(user?._id,verified);
		if(res.status){
			toast.success(res.msg);
		}else{
			toast.error(res.msg);
		}
		setIsOpen(false);
	}

	const handleSubmit=async(formData)=>{
		try{
			const query=formData.get("query")
			const res=await searchUsers(query);

			console.log(res);
			if(!res.status) toast.error(res.msg);

			setShow(true);
			setUsers(res.users);
			setState({...defaultstate,all:true});
		}catch(err){
			console.log(err);
			toast.error("Failed to search details");
		}
	}

	const resetInput=()=>{
		inputRef.current.value="";
		setUsers(data);
		setShow(false);
	}


	return (
		<section className="w-4/5 flex flex-col my-10">
			<p className="text-lg font-bold">Users</p>	
			<form action={handleSubmit}>   
			    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
			    <div className="relative">
			        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
			                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			            </svg>
			        </div>
			        <input ref={inputRef} name='query' type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 my-5 focus:ring-1 focus:ring-black focus:outline-none" placeholder="Search Users" required/>
			        {
			        	show && <button type="button" onClick={resetInput} className="text-white absolute right-24 bottom-3 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-sm px-1 py-1"><XMarkIcon className="text-white h-4 w-4"/></button>
			        }
			        <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-1.5">Search</button>
			    </div>
			</form>
			<section className="flex items-center gap-5 max-md:flex-wrap">
				<p onClick={()=>setState(()=>{ return {...defaultstate,all:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.all ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>All Users</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,ppending:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.ppending ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Payment Pending</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,vpending:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.vpending ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Verification Pending</p>
				<p onClick={()=>setState(()=>{ return {...defaultstate,verified:true}})} className={`text-sm font-medium max-md:text-center max-md:h-full px-5 py-0.5 rounded-md border cursor-pointer ${state.verified ? "bg-black text-white" : "text-black bg-white hover:bg-slate-100"}`}>Verified</p>
			</section>

			<div className="flex flex-col items-center gap-5 my-5">
				{
					users && users.filter((data)=>{
						if(state.all) return true;
						if(state.ppending) return !data.payment;
						if(state.verified) return data.verified;
						if(state.vpending) return data.payment && !data.verified;
					}).map(data=><UserComponent key={data.email} user={data} setUser={setUser} setIsOpen={setIsOpen} />)
				}	
			</div>
			<Dialog isOpen={isOpen} setIsOpen={setIsOpen} >
			 	<div className="flex flex-col py-7 px-4">
			 		<p className="text-xl font-medium mb-5">Payment Receipt</p>
			 		<Image src={user?.receipt} height={400} width={200} alt="reciept" className="w-full h-auto rounded-sm mb-5" />
			 		<div className="flex items-center w-full justify-evenly">
			 			<p onClick={()=>handleVerification(false)} className="btn_black rounded-md">Mark Pending</p>
			 			<p onClick={()=>handleVerification(true)} className="btn_success rounded-md">Mark Confirmed</p>
			 		</div>
			 	</div>
			</Dialog>
		</section>
	);
}

export default UserDetailSection;
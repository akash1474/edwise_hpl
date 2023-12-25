"use client";
import Image from 'next/image';
import {useState,useEffect,useRef} from 'react';
import InputComponent from '@components/InputComponent';
import PlayerDetail from '@components/PlayerDetail';
import InfoAlert from '@components/InfoAlert';

const TeamPage=()=>{
	const teamNameRef=useRef();
	const [msg,setMsg]=useState("Invalid Team Name: Please provide a valid name for your team.");
	const [error,setError]=useState(false);

	const createTeam=async(e)=>{
		e.preventDefault();
		if(!teamNameRef.current.value){
			setMsg("Invalid Team Name: Please provide a valid name for your team.");
			setError(true);
			return;
		}
		try{
			const res=await fetch("/api/teams/new",{
				method:'POST',
				body:JSON.stringify({
					name:teamNameRef.current.value
				})
			});

			if(res.ok){
				alert("Team created successfully!");
			}
		}catch(err){
			console.log(err);
		}
	}


	return(
	<div className="flex justify-center">

		<section className="flex flex-col items-center w-3/4">
		{
			error ?
			<div className="flex rounded-sm z-50 px-5 flex-col w-fit py-2 fixed right-4 bottom-4 bg-rose-200">
				<Image
					className="absolute cursor-pointer top-2 right-2"
					src="/assets/close.svg" 
					height={16} width={16} 
					alt="close" 
					onClick={()=>setError(false)}
				/>
				<p className="text-rose-600 mb-2 font-bold">Error</p>
				<p className="text-black max-w-[350px]">{msg}</p>
			</div>
			:null
		}
			{/*Captain Details*/}
			<div className="flex flex-wrap justify-between gap-5 mt-10 relative py-16">
				<InfoAlert title="Note" description="Please fill the details of the captain." />
				<p className="text-3xl font-extrabold absolute top-4 left-0">Captain Details</p>
				<InputComponent label="Name" />	
				<InputComponent label="Course" />	
				<InputComponent label="Age" />	
				<InputComponent label="WhatsApp Number" />	
			</div>
			<div className="flex flex-col mt-5 relative py-16">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Details</p>
				<div className="flex gap-5 flex-col w-full">
					<div className="flex gap-5 flex-wrap items-center justify-between w-full">
						<InputComponent elRef={teamNameRef} label="Team Name" />	
						<InputComponent label="Team Description" />	
					</div>
					<button type="button" onClick={createTeam} className="black_btn_square">Create Team</button>
				</div>
				<InfoAlert title="Note" description={"Select the player from the drop down. Fill the player details. Save the player info by clicking the button below. After saving select the next player and repeat the process."} />
			    <div className="mb-10">
			      <label className='mb-[5px] block text-base font-medium text-dark'>
			        Select Player
			      </label>
			      <div className='relative z-20'>
			        <select className='relative font-bold z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-black outline-none transition focus:border-indigo-500 active:border-primary disabled:cursor-default disabled:bg-gray-2'>
			          <option value='' className='dark:bg-dark-2'>Player 1: Name </option>
			          <option value='' className='dark:bg-dark-2'>Player 2: Name </option>
			          <option value='' className='dark:bg-dark-2'>Player 3: Name</option>
			        </select>
			        <span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
			      </div>
			    </div>
				<div className="flex flex-wrap justify-between gap-5">
					<InputComponent label="Name" />	
					<InputComponent label="Course" />	
					<InputComponent label="Age" />	
					<InputComponent label="WhatsApp Number" />	
					<button className="black_btn_square w-full">Save Current Player Information</button>
				</div>
			</div>
			<div className="flex flex-col mt-10 relative py-16 w-full max-sm:pt-20">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Summary</p>
				<PlayerDetail name="Aman Rajesh Vishwakarma" email="vishwakarmaaman@gmail.com" number={8637745084} age={21} isCaptain={true} />
				<PlayerDetail name="Aman Rajesh Vishwakarma" email="vishwakarmaaman@gmail.com" number={8637745084} age={21} isCaptain={false} />
				<PlayerDetail name="Aman Rajesh Vishwakarma" email="vishwakarmaaman@gmail.com" number={8637745084} age={21} isCaptain={false} />
				<PlayerDetail name="Aman Rajesh Vishwakarma" email="vishwakarmaaman@gmail.com" number={8637745084} age={21} isCaptain={false} />
				<PlayerDetail name="Aman Rajesh Vishwakarma" email="vishwakarmaaman@gmail.com" number={8637745084} age={21} isCaptain={false} />
			</div>
			<button className="primary_btn font-bold mb-10">Proceed To Playment</button>
		</section>	

	</div>
);
}

export default TeamPage;
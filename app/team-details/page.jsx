"use client";
import {useState,useEffect} from 'react';
import InputComponent from '@components/InputComponent';
import PlayerDetail from '@components/PlayerDetail';
import InfoAlert from '@components/InfoAlert';

const TeamPage=()=>(
	<div className="flex justify-center">

		<section className="flex flex-col items-center w-3/4">
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
				<InputComponent label="Team Name" />	
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
					<button className="login_btn font-bold">Save Current Player Information</button>
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

export default TeamPage;
"use client";

import {useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';

async function wait(ms){
	return new Promise(res=>setTimeout(res,ms));
}

const Payment=async()=>{
	// await wait(2000);


	return (
	<div className="h-[calc(100vh-200px)] min-h-[600px] w-full flex items-center justify-center">
		<section className=" relative flex w-[400px] flex-col items-start justify-center py-10 px-5 max-sm:shadow-none shadow-xl shadow-slate-600">
			<div className="flex flex-row mb-4 items-center justify-start">
				<Image height={32} width={32} alt="Logo" src="/logo.svg" />	
				<p className="text-lg font-bold ml-2 ">Hostel Premier League</p>
			</div>	
			<p className="font-bold text-md mb-5">Payment</p>
		    <label className='w-full mb-6 text-4xl text-indigo-500 font-extrabold text-center'>₹200</label>
		    <div className="w-full mb-10 grid place-items-center">
		    	<Image height={128} width={128} alt="qr_code_image" src="/assets/qr_code.svg"/>
		    </div>
		    <div className="w-full mb-5">
		      <label className='mb-2 block text-base font-medium text-black'>Upload Screenshot of Playment Receipt</label>
		      <input
		        type='file'
		        className='w-full cursor-pointer rounded-md border border-slate-300 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-gray-2 file:py-2 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-indigo-500 file:hover:bg-opacity-10 focus:border-indigo-500 active:border-indigo-500 disabled:cursor-default disabled:bg-gray-2'
		      />
		    </div>
			<button type="button" className="login_btn">Upload Payment Receipt</button>

		</section>
	</div>
	);
	
}

export default Payment;
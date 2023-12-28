"use client";

import {useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login=()=>(
	<div className="h-[calc(100vh-200px)] min-h-[600px] w-full flex items-center justify-center">
		<section className=" relative flex w-[400px] flex-col items-start justify-center py-10 px-5 max-sm:shadow-none shadow-md shadow-slate-600">
			<div className="flex flex-row mb-4 items-center justify-start">
				<Image height={32} width={32} alt="Logo" src="/logo.svg" />	
				<p className="text-lg font-bold ml-2 ">Hostel Premier League</p>
			</div>	
			<p className="font-medium text-md mb-5">SignUp to Hostel Premier League</p>
		    <div className="w-full mb-6">
		      <label className='mb-2 text-base font-medium '>
		        Email
		      </label>
		      <div className='relative'>
		        <input
		          type='email'
		          placeholder='info@yourmai.com'
		          className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
		        />
		        <span className='absolute top-1/2 left-4 -translate-y-1/2'>
		          <svg
		            width={20}
		            height={20}
		            viewBox="0 0 20 20"
		            fill="none"
		            xmlns="http://www.w3.org/2000/svg"
		          >
		            <g opacity={0.8} fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF">
		              <path d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
		              <path d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
		            </g>
		          </svg>
		        </span>
		      </div>
		    </div>
		    <div className="w-full mb-10">
		      <label className='mb-2 text-base font-medium '>
		        Password
		      </label>
		      <div className='relative'>
		        <input
		          type='password'
		          placeholder='****'
		          className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
		        />
		        <span className='absolute top-1/2 left-4 -translate-y-1/2'>
		          <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				  	<path opacity={0.8} d="M8 1C5.796875 1 4 2.796875 4 5L4 6L3.5 6C2.675781 6 2 6.675781 2 7.5L2 12.5C2 13.324219 2.675781 14 3.5 14L12.5 14C13.324219 14 14 13.324219 14 12.5L14 7.5C14 6.675781 13.324219 6 12.5 6L12 6L12 5C12 2.796875 10.203125 1 8 1 Z M 8 2C9.664063 2 11 3.335938 11 5L11 6L5 6L5 5C5 3.335938 6.335938 2 8 2 Z M 3.5 7L12.5 7C12.78125 7 13 7.21875 13 7.5L13 12.5C13 12.78125 12.78125 13 12.5 13L3.5 13C3.21875 13 3 12.78125 3 12.5L3 7.5C3 7.21875 3.21875 7 3.5 7Z" fill="#666" />
				  </svg>
		        </span>
		      </div>
		    </div>
          <button type="button" className="btn_black w-full rounded-sm">Login</button>
          <div className="flex justify-center w-full my-2 font-bold text-slate-600">Or</div>
          <div className="flex transition-all hover:bg-slate-200 cursor-pointer items-center rounded-sm justify-center py-1 border w-full  border-slate-500">
          	<Image src="/assets/google.svg" height={20} width={20} alt="google_icon"/>	
          	<p className="text-base font-bold ml-5">SignUp with Google</p>
          </div>
		</section>
	</div>
);

export default Login;
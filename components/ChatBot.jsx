"use client";
import {useState} from 'react';
import Image from 'next/image';
import {XMarkIcon} from '@heroicons/react/24/outline';



const ChatBot=()=>{

	const [isOpen,setIsOpen]=useState(false);

	return (
		<div className={`fixed right-2 bottom-2 h-fit  border-2 shadow-lg ${isOpen ? 'rounded-md bg-slate-200' : 'rounded-full bg-blue-200'}`}>
		{
			isOpen ? <XMarkIcon onClick={()=>setIsOpen(false)} className="h-5 w-5 ml-auto m-2 cursor-pointer text-rose-500" /> :null
		}
		{
			isOpen ? <iframe width="350" height="430" allow="microphone" src="https://console.dialogflow.com/api-client/demo/embedded/21d8058f-3128-48e3-a4ed-069f9839d1f5"></iframe>
			:<section onClick={()=>setIsOpen(true)} className="flex items-center px-5 py-2 justify-between rounded-full cursor-pointer">
				<Image src="/assets/chat.svg" height={32} width={32} alt="logo" />
				<p className="text-lg font-bold ml-5">Chat</p>
			</section>
		}		
		</div>
	)
}

export default ChatBot;
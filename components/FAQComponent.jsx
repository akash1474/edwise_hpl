"use client";
import { PlusIcon,MinusIcon } from '@heroicons/react/24/outline'
import {useState} from 'react'

const FAQComponent=({data})=>{
	const [isOpen,setIsOpen]=useState(false);
	const iconStyle="text-slate-800 min-h-8 min-w-8 max-h-8 max-w-8 p-1 ml-5";
	return (
		<div onClick={()=>setIsOpen(prev=>!prev)} className="w-full py-5 border-t transition-transform duration-75 border-t-slate-300  flex flex-col gap-6 px-4 cursor-pointer">
			<div className="w-full flex flex-row justify-between items-center"> 
				<p className="title text-xl font-semibold">{data.question}</p>
				{
					isOpen ? <MinusIcon className={iconStyle}  /> : <PlusIcon className={iconStyle}  />
				}
			</div>
			{
				isOpen ? <p className="text-slate-600 text-lg mr-10">{data.answer}</p> : null
			}
		</div>
	)
}

export default FAQComponent;
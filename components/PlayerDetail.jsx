"use client";
import Image from 'next/image'
import Link from 'next/link'


const PlayerDetail=({name,age,number,email,isCaptain,onClick,idx})=>(
	<Link href={isCaptain ? "#captain":"#player"}>
		<div onClick={()=>onClick(idx)} className="border border-slate-300 w-full py-2 rounded-md mb-4 shadow-sm hover:bg-slate-100 flex items-center justify-between px-5 max-md:flex-col">
			<div className="flex flex-row items-center max-sm:flex-col max-sm:mb-4">
				<div className="flex items-center">
					<div className="rounded-full w-3 h-3 bg-indigo-500 mr-4"></div>
					<p className="font-bold text-lg mr-4 max-sm:text-base">{name}</p>	
				</div>
					{
						isCaptain ? 
						<div className="rounded-md flex items-center px-4 text-sm text-white bg-indigo-500">Captain</div>
						:null
					}
			</div>
			<div className="flex items-center justify-center max-md:flex-wrap">
				<p className="text-xl text-slate-500 mr-4 font-bold max-sm:text-lg">{age}</p>
				<div className="flex items-center mr-4">
					<Image src="/assets/phone.svg" height={16} width={16} alt="phone" className="mr-2" />
					<p className="text-sm text-slate-700 font-bold">{number}</p>
				</div>
				<div className="flex items-center">
					<Image src="/assets/envelope.svg" height={16} width={16} alt="envelop" className="mr-2" />
					<p className="text-sm text-slate-700 font-bold">{email}</p>
				</div>
			</div>
		</div>
	</Link>
);

export default PlayerDetail;
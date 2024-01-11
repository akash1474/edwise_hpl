"use client";
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation';


const PlayerDetail=({player})=>{

	const router=useRouter();

	let color="";
	switch(player.type){
	case "captain":
		color="bg-indigo-500";
		break;
	case "reserve":
		color="bg-amber-500";
		break;
	default:
		color="bg-blue-500";
		break;
	}

	return (
		<Link className="w-full" href={player.type==="captain" ? "#captain": `/player?id=${player._id}`}>
			<div className="border border-slate-300 w-full py-2 rounded-md mb-4 shadow-sm hover:bg-slate-100 flex items-center justify-between px-5 max-md:flex-col">
				<div className="flex flex-row items-center max-md:flex-col max-md:mb-2 gap-5">
					<div className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-400 md:mr-3"></div>
					<div className="flex flex-col max-md:w-full max-md:items-center">
						<p className="font-bold text-lg max-sm:text-base max-md:w-full max-md:text-center">{player.name}</p>	
						<p className="text-sm text-slate-700 font-bold">{player.email}</p>
					</div>
					<p className={`rounded-md flex items-center px-4 text-sm text-white ${color} capitalize w-30`}>{player.type}</p>
				</div>
				<div className="flex items-center justify-center max-md:flex-wrap max-md:flex-col gap-2">
					<span className="flex flex-row">
						<p className="text-xl text-slate-500 mr-4 font-bold max-sm:text-lg">{player.age}</p>
						<div className="flex items-center mr-4">
							<Image src="/assets/phone.svg" height={16} width={16} alt="phone" className="mr-2" />
							<p className="text-sm text-slate-700 font-bold">{player.number}</p>
						</div>
					</span>
				</div>
			</div>
		</Link>
	);
}

export default PlayerDetail;
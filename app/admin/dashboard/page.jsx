import Image from 'next/image';
import Link from 'next/link';


import { getServerSession } from "next-auth";
import authOptions from "@utils/auth.js";
import { redirect } from "next/navigation";


import Team from "@models/team.js";
import Player from "@models/player";
import User from "@models/user";
import { connectToDB } from "@utils/database";


import StatsComponent from '@components/StatsComponent';
import SectionController from '@components/SectionController';
import Dialog from '@components/Dialog';

import {UserGroupIcon,CurrencyRupeeIcon,BankNotesIcon} from '@heroicons/react/24/solid';


const Dashboard=async()=>{
	let session = await getServerSession(authOptions);
	if (!session?.user?.is_admin) return redirect("/");


	await connectToDB();
	let teams = await Team.find({}).populate("user_id");
	let users=await User.find({is_admin:false}).limit(20);
	let players=await Player.find().limit(20);
	let players_count=0;
	let pending_count=0;
	let earnings=0;
	teams.map((team)=>{
		players_count+=team.player_count;
	});

	users.map((usr)=>{
		if(usr.is_admin) return;
		if(!usr.payment) pending_count++;
		if(usr.payment) earnings+=200;;
	})

	if (teams) {
		session = JSON.parse(JSON.stringify(session));
		teams = JSON.parse(JSON.stringify(teams));
		users = JSON.parse(JSON.stringify(users));
	}


	return(
		<div className="flex flex-col w-full py-15 items-center">
			<section className="flex flex-col w-4/5 my-10">
				<p className="text-lg font-bold">Stats</p>	
				<div className="flex items-center justify-between my-2 flex-wrap gap-5 max-sm:justify-center">
					<StatsComponent title="Registrations" color="text-indigo-500" bgcolor="bg-indigo-100" value={users.length} side="bg-indigo-500">
						<UserGroupIcon className="h-10 w-10 text-indigo-500" />
					</StatsComponent>	
					<StatsComponent title="Payment Pending" color="text-amber-500" bgcolor="bg-amber-100" value={pending_count} side="bg-amber-500">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-amber-500" >
						  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
						  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
						  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
						</svg>
					</StatsComponent>	
					<StatsComponent title="Total Revenue" color="text-teal-500" bgcolor="bg-teal-100" value={earnings} side="bg-teal-500">
						<CurrencyRupeeIcon className="h-10 w-10 text-teal-500" />
					</StatsComponent>	
					<StatsComponent title="Total Players" color="text-blue-500" bgcolor="bg-blue-100" value={players_count} side="bg-blue-500">
						<UserGroupIcon className="h-10 w-10 text-blue-500" />
					</StatsComponent>	
				</div>
			</section>
			<SectionController users={users} teams={teams} players={players} />
		</div>
	);
}

export default Dashboard;

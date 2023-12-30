import Link from 'next/link';
import InputComponent from '@components/InputComponent';
import PlayerDetail from '@components/PlayerDetail';
import InfoAlert from '@components/InfoAlert';
import TeamForm from '@components/TeamForm';
import CaptainForm from '@components/CaptainForm';
import PlayerForm from '@components/PlayerForm';

import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';
import {redirect} from 'next/navigation';

import Team from '@models/team.js';
import Player from '@models/player'
import { connectToDB } from '@utils/database';

const TeamPage=async()=>{
	let session=await getServerSession(authOptions);
	if(!session?.user) return redirect("/");

	await connectToDB();
	let team=await Team.findOne({user_id:session.user.id});
	let players=null;
	let captain=null;
	if(team){
		players=await Player.find({team_id:team._id});
		console.log(players);
		session=JSON.parse(JSON.stringify(session));
		team=JSON.parse(JSON.stringify(team));
		players=JSON.parse(JSON.stringify(players));
		captain=players[0];
	}

	return(
	<div className="flex justify-center">

		<section className="flex flex-col items-center w-3/4">

			<div className="flex flex-wrap justify-between gap-5 mt-10 relative py-16">
				<InfoAlert title="Note" description="Please fill the details of the team." />
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Details</p>
				<TeamForm team={team} user={session?.user} />
			</div>

			<div id="captain" className="flex flex-col  mt-10 relative py-16">
				<InfoAlert title="Note" description="Please fill the details of the captain. Make sure that the details are accurate for future contact purpose related to event." />
				<p className="text-3xl font-extrabold absolute top-4 left-0">Captain Details</p>
				<CaptainForm captain={captain} team={team} user={session?.user} />
			</div>

			<div id="player" className="flex flex-col mt-5 relative py-16">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Player Details</p>
				<InfoAlert title="Note" description={"Fill the details of each player. Click the button below to add player to the team. Repeat the process for filling the detials of remaining players. Once a player is added you can verify the details in team summary section below."} />
				<PlayerForm team={team} player={null} />
			</div>


			<div className="flex flex-col mt-10 relative py-16 w-full max-sm:pt-20">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Summary</p>
				<InfoAlert title="Note" description={"You can update a player info by clicking on the respective player. The details of the player will be populated in the above section. You can then update the info and click the update button."} />
				{
					players ? 
					players.map((player,i)=><PlayerDetail key={player.email} player={player} />)
					:
					<p className="text-slate-400">No Team Members Added</p>
				}
			</div>
			{
				!session?.user.payment ?
				(
				<Link href="/payment">
					<button className="btn_primary w-fit font-bold mb-10 rounded-sm">Proceed To Playment</button>
				</Link>
				):null
			}
		</section>	

	</div>
);
}

export default TeamPage;
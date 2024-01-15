import Team from '@models/team.js';
import Player from "@models/player.js";
import {redirect} from 'next/navigation';
import { connectToDB } from '@utils/database';
import PlayerForm from '@components/PlayerForm';
import InfoAlert from '@components/InfoAlert';

import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';

const PlayerUpdatePage=async({searchParams})=>{
	let session=await getServerSession(authOptions);
	if(!session?.user) return redirect("/");
	session=JSON.parse(JSON.stringify(session));

	const id=searchParams.id;
	if(id.length!==24) redirect('/');

	await connectToDB();

	let player=await Player.findById(id);
	player=JSON.parse(JSON.stringify(player));

	let team=await Team.findById(player?.team_id);
	team=JSON.parse(JSON.stringify(team));


	console.log(team.user_id);
	console.log(session.user.id);
	if(!session.user?.is_admin && session.user.id!==team.user_id){
		return <p className="text-5xl font-black w-full text-center my-20">Unauthorized player access!</p>
	}
	console.log(player);

	return (
		<div className="flex flex-col items-center">
			<section className="flex flex-col items-center w-3/4">
				<div id="player" className="flex flex-col mt-5 relative py-16">
					<p className="text-3xl font-extrabold absolute top-4 left-0">Player Details</p>
					<InfoAlert title="Note" description={"Update appropriate details of the player in their respective fields. Don't forget the press the submit button."} />
					<PlayerForm team={team} player={player} isUpdating={true} />
				</div>
			</section>
		</div>
	);
};

export default PlayerUpdatePage;
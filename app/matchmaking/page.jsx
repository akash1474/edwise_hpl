import Team from '@models/team';

import EventMatchMaking from '@components/EventMatchMaking';
const MatchMaking=async()=>{
	let teams=await Team.find({},{name:1,player_count:1,type:1});
	teams=JSON.parse(JSON.stringify(teams));

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<EventMatchMaking teams={teams} />
		</div>
	);
}

export default MatchMaking;
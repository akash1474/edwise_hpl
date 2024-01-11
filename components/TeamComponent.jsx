const TeamComponent=({team})=>{

	return (
		<div className="flex flex-row items-center justify-between w-full py-2 px-5 rounded-md border border-slate-400 shadow-sm max-md:flex-col relative">
			<div className="flex items-center justify-between gap-4">
				<p className="bg-indigo-500 h-3 w-3 rounded-full"></p>
				<div className="flex flex-col max-md:w-full max-md:items-center">
					<p className="font-medium text-lg max-sm:text-base max-md:w-full max-md:text-center">{team.name}</p>	
					<p className="text-sm text-slate-700 font-medium">{team.user_id?.username || "Akash Pandit"}</p>
				</div>
				<span className={`text-sm font-medium  ml-5 px-5 py-1 flex items-center gap-2 rounded-full max-md:absolute max-md:right-0 max-md:top-0 max-md:rounded-md max-md:rounded-b-none max-md:rounded-tl-none`}>
					<p className={`h-2 w-2 rounded-full bg-black  p-0 m-0`}></p>
					<p className={`mt-1`}>Pending</p>
				</span>
			</div>
			<div className="flex items-center gap-5 max-md:flex-col">
				<p className="text-base font-medium">{team.player_count} Players</p>
				<p className="btn_black rounded-md">Team Details</p>
			</div>
		</div>
	);
}


export default TeamComponent;
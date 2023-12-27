"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useState,useEffect,useRef} from 'react';
import InputComponent from '@components/InputComponent';
import PlayerDetail from '@components/PlayerDetail';
import InfoAlert from '@components/InfoAlert';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

const TeamPage=()=>{
	const {data:session}=useSession();
	const router=useRouter();
	const [msg,setMsg]=useState("Invalid Team Name: Please provide a valid name for your team.");
	const [error,setError]=useState(false);
	const [team,setTeam]=useState({});
	const [players,setPlayers]=useState([]);
	const [isUpdatingPlayer,setIsUpdatingPlayer]=useState(false);
	const [isUpdatingCaptain,setIsUpdatingCaptain]=useState(false);
	const [isUpdatingTeam,setIsUpdatingTeam]=useState(false);
	const [currIdx,setCurrIdx]=useState(-1);

	//Team Details
	const teamNameRef=useRef();
	const teamDescRef=useRef();

	//Captain Details
	const captainName=useRef();
	const captainAge=useRef();
	const captainEmail=useRef();
	const captainNumber=useRef();
	const captainCourse=useRef();
	//Player Details
	const player_name=useRef();
	const player_age=useRef();
	const player_course=useRef();
	const player_number=useRef();
	const player_email=useRef();


	const createTeam=async(e)=>{
		e.preventDefault();
		if(!teamNameRef.current.value){
			setMsg("Invalid Team Name: Please provide a valid name for your team.");
			setError(true);
			return;
		}
		try{
			const url=isUpdatingTeam ? `/api/teams/${team._id}` : "/api/teams/new";
			const res=await fetch(url,{
				method: isUpdatingTeam ? 'PATCH':'POST',
				body:JSON.stringify({
					name:teamNameRef.current.value,
					description:teamDescRef.current.value,
					user_id:session?.user.id
				})
			});

			console.log(res.statusText);
			if(!res.ok){
				setMsg("Invalid Team Name: Team Name is already registered!");
				setError(true);
			}


			if(res.ok){
				alert(isUpdatingTeam ? "Team info updated successfully!":"Team created successfully!");
				const data=await res.json();
				localStorage.setItem("team",JSON.stringify(data));
				console.log(data);
				setTeam(data);
				if(!isUpdatingTeam) setIsUpdatingTeam(true);
			}
		}catch(err){
			console.log(err);
		}
	}

	const createCaptain=async(e)=>{
		e.preventDefault();
		const checkFailed=!captainName.current.value || !captainAge.current.value || !captainCourse.current.value || !captainNumber.current.value || !captainEmail.current.value;
		if(checkFailed){
			setMsg("Fill the captain details properly");
			setError(true);
			return;
		}
		if(captainAge.current.value>70){
			setMsg("Player Age is greater than 70 years");
			setError(true);
			return;
		}
		if(captainNumber.current.value.length!==10){
			setMsg("WhatsApp/Mobile number should be of 10 digits");
			setError(true);
			return;
		}
		if(!isValidEmail(captainEmail.current.value)){
			setMsg("Please provide a valid email");
			setError(true);
			return;
		}
		try{
			const url=isUpdatingCaptain ? `/api/players/captain/${players[0]?._id}` : "/api/players/new";
			const res=await fetch(url,{
				method:isUpdatingCaptain ? 'PATCH':'POST',
				body:JSON.stringify({
					name:captainName.current.value,
					age:captainAge.current.value,
					email:captainEmail.current.value,
					course:captainCourse.current.value,
					is_captain:true,
					number:captainNumber.current.value,
					team_id:team?._id
				})
			});

			if(!res.ok){
				setMsg("Invalid Captain Info: Please Provide team details");
				setError(true);
			}


			if(res.ok){
				alert(isUpdatingCaptain ? "Captain details updated!":"Captain added successfully!");
				console.log(await res.json());
				setIsUpdatingCaptain(true);
				await getTeamPlayers();
				if(error) setError(false);
			}
		}catch(err){
			console.log(err);
		}

	}
	function isValidEmail(email) {
	  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  return emailRegex.test(email);
	}

	const addPlayer=async(e)=>{
		e.preventDefault();
		if(players.length==11){
			setMsg("Team Players Limit Reached");
			setError(true);
			return;
		}
		const checkFailed=!player_name.current.value || !player_age.current.value || !player_course.current.value || !player_number.current.value || !player_email.current.value;
		if(checkFailed){
			setMsg("Fill the player details properly");
			setError(true);
			return;
		}
		if(player_age.current.value>70){
			setMsg("Player Age is greater than 70 years");
			setError(true);
			return;
		}
		if(player_number.current.value.length!==10){
			setMsg("WhatsApp/Mobile number should be of 10 digits");
			setError(true);
			return;
		}
		if(!isValidEmail(player_email.current.value)){
			setMsg("Please provide a valid email");
			setError(true);
			return;
		}
		try{
			const url=isUpdatingPlayer ? "/api/players" : "/api/players/new";
			let data={
					name:player_name.current.value,
					age:player_age.current.value,
					email:player_email.current.value,
					course:player_course.current.value,
					is_captain:false,
					number:player_number.current.value,
					team_id:team?._id
			}
			if(isUpdatingPlayer){
				data._id=players[currIdx]._id;
			}

			const res=await fetch(url,{
				method:isUpdatingPlayer ? 'PATCH' :'POST',
				body:JSON.stringify(data)
			});

			if(!res.ok){
				setMsg("Invalid Player Info: Please Provide player details");
				setError(true);
			}


			if(res.ok){
				alert("Player added successfully!");
				const data=await res.json();
				console.log(data);
				getTeamPlayers();
				player_name.current.value="";
				player_number.current.value="";
				player_course.current.value="";
				player_email.current.value="";
				player_age.current.value="";
				if(isUpdatingPlayer) setIsUpdatingPlayer(false);
			}
		}catch(err){
			console.log(err);
		}

	}

	const getTeamDetails=async()=>{
		console.log(session.user.id);
		const res=await fetch(`/api/teams/myteam/${session?.user.id}`);
		if(res.ok){
			const data=await res.json();
			console.log(data);
			if(!data) return;
			teamNameRef.current.value=data.name;
			teamDescRef.current.value=data.description;
			setTeam(data);
			localStorage.setItem("team",JSON.stringify(data));
			setIsUpdatingTeam(true);
		}else{
			console.log(res.statusText);
		}
	}

	const getCaptainDetails=async()=>{
		const team_data=JSON.parse(localStorage.getItem("team")) || {};
		if(!team_data) return;
		const res=await fetch(`/api/players/captain/${team_data._id}`);
		if(res.ok){
			const data=await res.json();
			console.log(data);
			captainName.current.value=data.name;
			captainNumber.current.value=data.number;
			captainCourse.current.value=data.course;
			captainEmail.current.value=data.email;
			captainAge.current.value=data.age;
			setIsUpdatingCaptain(true);
		}else{
			console.log(res.statusText);
		}
	}

	const getTeamPlayers=async()=>{
		const team_data=JSON.parse(localStorage.getItem("team")) || {};
		if(!team_data) return;
		const res=await fetch(`/api/teams/${team_data._id}`);
		if(res.ok){
			const data=await res.json();
			console.log(data);
			setPlayers(data.data);
		}else{
			console.log(res.statusText);
		}
	}


	useEffect(()=>{
		if(!session){
			router.push('/');
			return;
		}
		console.log(session);

		(async()=>{
			try{
				await getTeamDetails();
				await getCaptainDetails();
				await getTeamPlayers();
			}catch(err){
				console.log(err);
			}
		})();
	
	},[]);

	useEffect(()=>{},[]);

	const handlePlayerUpdate=(idx)=>{
		if(players[idx].is_captain) return;
		setIsUpdatingPlayer(true);
		console.log(idx);
		setCurrIdx(idx);
		player_name.current.value=players[idx].name;
		player_number.current.value=players[idx].number;
		player_course.current.value=players[idx].course;
		player_email.current.value=players[idx].email;
		player_age.current.value=players[idx].age;
	}

	return(
	<div className="flex justify-center">

		<section className="flex flex-col items-center w-3/4">
		{
			error ?
			<div className="flex rounded-sm z-50 px-5 flex-col w-fit py-2 fixed right-4 bottom-4 bg-rose-200">
				<Image
					className="absolute cursor-pointer top-2 right-2"
					src="/assets/close.svg" 
					height={16} width={16} 
					alt="close" 
					onClick={()=>setError(false)}
				/>
				<p className="text-rose-600 mb-2 font-bold">Error</p>
				<p className="text-black max-w-[350px]">{msg}</p>
			</div>
			:null
		}
			<div className="flex flex-wrap justify-between gap-5 mt-10 relative py-16">
				<InfoAlert title="Note" description="Please fill the details of the team." />
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Details</p>
				<div className="flex gap-5 flex-wrap items-center justify-between w-full">
					<InputComponent elRef={teamNameRef} label="Team Name" />	
					<InputComponent elRef={teamDescRef} label="Team Description" />	
				</div>
				<button type="button" onClick={createTeam} className="black_btn_square">
					{
						isUpdatingTeam ? "Update Team" : "Create Team"
					}
				</button>
			</div>
			<div id="captain" className="flex flex-col  mt-10 relative py-16">
				<InfoAlert title="Note" description="Please fill the details of the captain. Make sure that the details are accurate for future contact purpose related to event." />
				<p className="text-3xl font-extrabold absolute top-4 left-0">Captain Details</p>
				<div className="flex flex-wrap justify-between gap-5">
					<InputComponent elRef={captainName} label="Name" />	
					<InputComponent elRef={captainCourse} label="Course" />	
					<InputComponent elRef={captainAge} label="Age" />	
					<InputComponent elRef={captainNumber} label="WhatsApp Number" />	
					<InputComponent elRef={captainEmail} label="Email" />	
				</div>
				<button type="button" onClick={createCaptain} className="black_btn_square mt-5">{
					isUpdatingCaptain ? "Update" : "Submit"
				}</button>
			</div>
			<div id="player" className="flex flex-col mt-5 relative py-16">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Player Details</p>
				<InfoAlert title="Note" description={"Fill the details of each player. Click the button below to add player to the team. Repeat the process for filling the detials of remaining players. Once a player is added you can verify the details in team summary section below."} />
				<div className="flex flex-wrap justify-between gap-5">
					<div className="flex flex-wrap justify-between gap-5">
						<InputComponent elRef={player_name} label="Name" />	
						<InputComponent elRef={player_course} label="Course" />	
						<InputComponent elRef={player_age} label="Age" />	
						<InputComponent elRef={player_number} label="WhatsApp Number" />	
						<InputComponent elRef={player_email} label="Email" />	
					</div>
					<button onClick={addPlayer} className="black_btn_square w-full">
						{
							isUpdatingPlayer ? "Update Player" : "Add Player To Team"
						}
					</button>
				</div>
			</div>
			<div className="flex flex-col mt-10 relative py-16 w-full max-sm:pt-20">
				<p className="text-3xl font-extrabold absolute top-4 left-0">Team Summary</p>
				<InfoAlert title="Note" description={"You can update a player info by clicking on the respective player. The details of the player will be populated in the above section. You can then update the info and click the update button."} />
				{
					players.length ==0 ? <p className="text-slate-400">No Team Members Added</p>: null
				}
				{
					players.map((player,i)=><PlayerDetail onClick={handlePlayerUpdate} idx={i} key={player.email} name={player.name} email={player.email} number={player.number} age={player.age} isCaptain={player.is_captain} />)
				}
			</div>
			{
				!session?.user.payment ?
				(
				<Link href="/payment">
					<button className="primary_btn font-bold mb-10">Proceed To Playment</button>
				</Link>
				):null
			}
		</section>	

	</div>
);
}

export default TeamPage;
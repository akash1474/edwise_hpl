"use client";
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import {useEffect,useState} from 'react';
import {useFormStatus} from 'react-dom';
import toast  from 'react-hot-toast';

const LoginButton=()=>{
	const router=useRouter();
	const [providers,setProviders]=useState(null);

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
			console.log(res);
		})();
	}, []);

	const handleSignIn=async()=>{
		await signIn(providers.google.id,{
			callbackUrl:'https://hostel-premier-league.vercel.app/team-type'
		});
	}

    return (<>
        <button
			type='button'
			key={"google"}
			onClick={handleSignIn}
			className='btn_black rounded-full group min-w-fit'
        >
        <CheckBadgeIcon className="h-5 w-5 text-white mr-2 group-hover:text-black transition-colors duration-75" />
          Accept & Login
        </button>
    </>);
}

const LogoutButton=()=>{
	const router=useRouter();

	return (
    <button type='button' 
    	onClick={async()=>{
        	localStorage.clear();
        	await signOut();
        }}
        className='outline_btn'>
      Sign Out
    </button>
    );
}

const FormSubmitButton=({text})=>{
	const {pending}=useFormStatus();
	return (
		<button type="submit" className="btn_black w-fit rounded-sm max-md:w-full mt-5 transition-all duration-75">
			<span className="flex flex-row items-center gap-3">
				{
					pending ? 
					<svg aria-hidden="true" className="mx-5 inline w-5 h-5 animate-spin text-gray-600  fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
				    </svg>
					:
					<p className="text-base">{text}</p>
				}
			</span>
		</button>
	);
}



const PaymentButton=({players,count,max})=>{
	const router=useRouter();
	const handleClick=()=>{
		let rp=2;
		let pp=0;
		switch(max){
			case 8:
				pp=6;
				break;
			case 10:
				pp=8;
				break;
			case 13:
				pp=11;
				break;
		}
		let rpc=0;
		let apc=0;
		let cpc=0;
		players.map((e)=>{
			switch(e.type){
			case "captain":
				cpc++;
				break;
			case "reserve":
				rpc++;
				break;
			default:
				apc++;
				break
			}
		})
		console.log("Captain:",cpc);
		console.log("Active:",apc);
		console.log("Reserve:",rpc);

		if(players.length!==max){
			toast((t)=>{
				return <span className="p-5">
					<p className="text-base font-bold">Team must have {max} players</p>
					<ul className="">
						<li>📗 {pp} Active Players</li>
						<li>📒 {rp} Reserve Players</li>
					</ul>
					<p className="text-base"></p>
				</span>
			})
			return;
		}


		if(rpc!==rp){
			toast.error("Your team must have 2 reserve players");
			return;
		}
		if(cpc!==1){
			toast.error("A team must have one captain");
			return;
		}
		if(pp!==(cpc+apc)){
			toast.error(`Active player count must be ${max-2}`);
			return;
		}
		router.push('/payment');
	}

	return (
		<button 
		onClick={handleClick}
		className="btn_black w-fit font-bold mb-10 rounded-sm">
		Proceed To Playment
		</button>
	);
}

export {LoginButton,LogoutButton,FormSubmitButton,PaymentButton};
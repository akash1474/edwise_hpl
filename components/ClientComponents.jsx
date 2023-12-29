"use client";
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import {useEffect,useState} from 'react';

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
		await signIn(providers.google.id);
		router.push('/');
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
        	// router.push('/');
        	await signOut();
        }}
        className='outline_btn'>
      Sign Out
    </button>
    );
}

export {LoginButton,LogoutButton};
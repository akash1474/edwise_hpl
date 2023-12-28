"use client";
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/outline'
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

    return (<>
        <button
			type='button'
			key={"google"}
			onClick={async() => {
				await signIn(providers.google.id);
				router.push('/');
			}}
			className='btn_black rounded-full group min-w-fit'
        >
        <UserIcon className="h-5 w-5 text-white mr-2 group-hover:text-black transition-colors duration-75" />
          Sign in
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
        	router.push('/');
        }}
        className='outline_btn'>
      Sign Out
    </button>
    );
}

export {LoginButton,LogoutButton};
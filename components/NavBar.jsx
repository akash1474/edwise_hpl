import Image from 'next/image';
import Link from 'next/link'
import Menu from '@components/Menu';

import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';

import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
import { UserIcon,Bars3BottomRightIcon } from '@heroicons/react/24/outline'

import {LoginButton, LogoutButton} from '@components/ClientComponents';


const NavBar =async()=>{
  const session=await getServerSession(authOptions);
  console.log(session?.user);

	return <div className="flex items-center justify-between h-14 px-4 w-full bg-slate-200">
		<Link href="/" className="font-bold flex items-center justify-between">
			<Image height={32} width={32} alt="Logo" src="/logo.svg" />	
			<p className="text-lg min-w-fit ml-2 max-sm:hidden">Hostel Premier League</p>
		</Link>
		<div className="flex w-96 items-center justify-between max-md:hidden">
			<Link href="/" className="nav-link">Home</Link>
			{
				session?.user ? <Link href="/team-details" className="nav-link">Team</Link>:null
			}
			<Link href="/#info" className="nav-link">Info</Link>
			<Link href="/process" className="nav-link">Process</Link>
			<Link href="/location" className="nav-link">Location</Link>
		</div>
		<div className="flex">
		{
			session?.user ? (
			<div className="flex gap-3 md:gap-5">
				<LogoutButton />
	            <Link href='/team-details'>
	              <Image
	                src={session?.user.image}
	                width={37}
	                height={37}
	                className='rounded-full'
	                alt='profile'
	              />
	            </Link>
	        </div>
            ):(
            <LoginButton />
          )}
			<div className="p-1 hidden rounded-md max-md:block hover:bg-slate-300 max-md:ml-5">
				<Bars3BottomRightIcon className="w-6 h-6 min-h-6 min-w-6" />
			</div>
		</div>
		{/*<Menu elementRef={elementRef} showMenu={showMenu} setShowMenu={setShowMenu} session={session} />*/}
	</div>
}

export default NavBar;
"use client";
import Image from 'next/image';
import Link from 'next/link'
import PrimaryButton from '@components/PrimaryButton'
import Menu from '@components/Menu';
import {useRouter} from 'next/navigation';
import {useState,useRef,useEffect} from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';

const NavBar =()=>{
	const {data:session}=useSession();
	const router=useRouter();

	const [providers,setProviders]=useState(null);
	const [isLoggedIn,setIsLoggedIn]=useState(false);
	const [showMenu, setShowMenu]=useState(false);
	const elementRef=useRef();

	useEffect(() => {
	    const handleClickOutside = (event) => {
	      if (elementRef.current && !elementRef.current.contains(event.target)) {
	      	if(showMenu) setShowMenu(false);
	      }
	    };
	    document.addEventListener('mousedown', handleClickOutside);
	    return () => {
	      document.removeEventListener('mousedown', handleClickOutside);
	    };
	}, []);


	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	if(session?.user){
		localStorage.setItem("user",JSON.stringify(session.user));
	}

  // const fetchPosts = async () => {
  //   const response = await fetch("/api/users/298349");
  //   const data = await response.json();
  //   console.log(data);
  //   // setAllPosts(data);
  // };

// 	useEffect(() => {
// 	fetchPosts();
// 	}, []);



	return <div className="flex items-center justify-between h-14 px-4 w-full bg-slate-200">
		<Link href="/" className="font-bold flex items-center justify-between">
			<Image height={32} width={32} alt="Logo" src="/logo.svg" />	
			<p className="text-lg ml-2 max-sm:hidden">Hostel Premier League</p>
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
{/*			<Link href="/login">
				<PrimaryButton  title={isLoggedIn ? "Logout":"Register/Login"} />
			</Link>
*/}	
		{
			session?.user ? (
			<div className="flex gap-3 md:gap-5">
	            <button type='button' onClick={async()=>{
	            	localStorage.clear();
	            	await signOut();
	            	router.push('/');
	            }} className='outline_btn'>
	              Sign Out
	            </button>

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
	          <>
	            {providers &&
	              Object.values(providers).map((provider) => (
	                <button
	                  type='button'
	                  key={provider.name}
	                  onClick={async() => {
	                    await signIn(provider.id);
		            	router.push('/');
	                  }}
	                  className='black_btn'
	                >
	                  Sign in
	                </button>
	              ))}
	          </>
          )}
			<div onClick={()=>setShowMenu(true)} className="p-1 hidden rounded-md max-md:block hover:bg-slate-300 max-md:ml-5">
				<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
				</svg>
			</div>
		</div>
				{/*<Image src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" height={42} width={42} className="rounded-full" alt="profile"/>*/}
		<Menu elementRef={elementRef} showMenu={showMenu} setShowMenu={setShowMenu} session={session} />
	</div>
}

export default NavBar;
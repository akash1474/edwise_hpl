"use client";
import Link from 'next/link'
import {useState,useRef,useEffect} from 'react';
import {Bars3BottomRightIcon } from '@heroicons/react/24/outline'

function Menu({session}){

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

	return (
		<>
		<div onClick={()=>setShowMenu(true)} className="p-1 hidden rounded-md max-md:block hover:bg-slate-300 max-md:ml-5">
			<Bars3BottomRightIcon className="w-6 h-6 min-h-6 min-w-6" />
		</div>
		<div ref={elementRef} className={showMenu ? "menu bg-gray-800 rounded-sm absolute min-w-fit" : "menu-disable"}>
			<svg onClick={(e)=>setShowMenu(false)} className="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			  <path d="M4.7070312 3.2929688L3.2929688 4.7070312L10.585938 12L3.2929688 19.292969L4.7070312 20.707031L12 13.414062L19.292969 20.707031L20.707031 19.292969L13.414062 12L20.707031 4.7070312L19.292969 3.2929688L12 10.585938L4.7070312 3.2929688 z" fill="#FFFFFF" />
			</svg>
			<div className="menu-container">
				<Link onClick={()=>setShowMenu(false)} href="/" className="menu-item">Home</Link>
				{
					session?.user ? (<Link onClick={()=>setShowMenu(false)} href="/team-details" className="menu-item">Team</Link>) :null
				}
				<Link onClick={()=>setShowMenu(false)} href="/learn-more" className="menu-item">Info</Link>
				<Link onClick={()=>setShowMenu(false)} href="/contact-us" className="menu-item">ContactUs</Link>
				<Link onClick={()=>setShowMenu(false)} href="/privacy-policy" className="menu-item">Privacy Policy</Link>
			</div>
		</div>
		</>
	)
}

export default Menu;
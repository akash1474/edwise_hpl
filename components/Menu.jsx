import Link from 'next/link'

function Menu({showMenu,setShowMenu,elementRef,session}){

	return (<div ref={elementRef} className={showMenu ? "menu bg-gray-800 rounded-sm" : "menu-disable"}>
		<svg onClick={(e)=>setShowMenu(false)} className="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		  <path d="M4.7070312 3.2929688L3.2929688 4.7070312L10.585938 12L3.2929688 19.292969L4.7070312 20.707031L12 13.414062L19.292969 20.707031L20.707031 19.292969L13.414062 12L20.707031 4.7070312L19.292969 3.2929688L12 10.585938L4.7070312 3.2929688 z" fill="#FFFFFF" />
		</svg>
		<div className="menu-container">
			<Link onClick={()=>setShowMenu(false)} href="/" className="menu-item">Home</Link>
			{
				session?.user ? (<Link onClick={()=>setShowMenu(false)} href="/team-details" className="menu-item">Team</Link>) :null
			}
			{/*<Link onClick={()=>setShowMenu(false)} href="#info" className="menu-item">Info</Link>*/}
			<Link onClick={()=>setShowMenu(false)} href="#location" className="menu-item">Location</Link>
			<Link onClick={()=>setShowMenu(false)} href="#contact" className="menu-item">Contact</Link>
		</div>
	</div>)
}

export default Menu;
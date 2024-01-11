import Image from 'next/image';


const UserComponent=({user,setUser,setIsOpen})=>{

	const bgColor=user.payment ? user.verified ? "bg-teal-100" : "bg-amber-100" : "bg-rose-100";
	const textColor=user.payment ? user.verified ? "text-teal-600" : "text-amber-600" : "text-rose-600";
	const dotColor=user.payment  ? user.verified ? "bg-teal-600" : "bg-amber-600" :"bg-rose-600";
	const statusText=user.payment ? user.verified ? "Verified Payment" : "Verification Pending" : "Payment Pending";

	return (
		<div className="flex items-center border border-slate-400 shadow-sm gap-10 w-full justify-between px-5 py-1 rounded-md max-md:flex-col max-md:gap-2 max-md:py-5 relative">
			<div className="flex flex-row items-center max-md:flex-col max-md:mb-2 gap-3">
				<Image height={42} width={42} src={user?.image} alt="profile" className="rounded-full" />
				<div className="flex flex-col max-md:w-full max-md:items-center">
					<p className="font-medium text-lg max-sm:text-base max-md:w-full max-md:text-center">{user.username}</p>	
					<p className="text-sm text-slate-700 font-medium">{user.email}</p>
				</div>
				<span className={`text-sm font-medium ${bgColor} ml-5 px-5 py-1 flex items-center gap-2 rounded-full max-md:w-full max-md:justify-center max-md:rounded-md max-md:ml-0`}>
					<p className={`h-2 w-2 rounded-full ${dotColor} p-0 m-0`}></p>
					<p className={`${textColor} mt-1`}>{statusText}</p>
				</span>
			</div>
			<div className="flex gap-5">
				<p className="btn_black rounded-md">Team Details</p>
				<p onClick={()=>{
					setIsOpen(true);
					setUser(user);
				}} className={`btn_primary rounded-md ${user.payment ? "bg-indigo-500" : "bg-indigo-300 hover:bg-indigo-300 border-indigo-300 hover:text-white cursor-not-allowed select-none"}`}>{user.payment ? "View Reciept" : "No Reciept"}</p>
			</div>
		</div>
	);
}


export default UserComponent;
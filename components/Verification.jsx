const Verification=({user})=>{

	return user.payment ? (
		<section className={`w-4/5 h-15 max-w-[1300px] flex flex-row items-center rounded-md ${user.verified ? "bg-teal-200" : "bg-orange-200"} mt-10 justify-center p-5`}>
		  <div className="flex flex-col w-full">
		    <p className="text-black w-full font-extrabold text-lg mb-2 max-md:text-center">{
		      user.verified ? "Payment Verified" : "Payment under verification"
		    }</p>
		    <p className={`${user.verified ? "text-teal-700" :"text-orange-600"} w-full font-medium  max-md:text-center`}>
		      {
		        user.verified ? "Payment receipt verified you are good to go." : "Status will be updated once payment is verified"
		      }
		    </p>
		  </div>
		</section>):null;
}

export default Verification;

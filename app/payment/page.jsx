import Image from 'next/image';
import Link from 'next/link';
import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';
import FileUpload from '@components/FileUpload';
import {redirect} from 'next/navigation';

async function wait(ms){
	return new Promise(res=>setTimeout(res,ms));
}

const Payment=async()=>{
	// await wait(2000);
  const session=await getServerSession(authOptions);
  // console.log(session.user);

	if(!session?.user || session?.user.payment){
		return redirect("/");
	}


	return (
	<div className="h-[calc(100vh-200px)] min-h-[600px] w-full flex items-center justify-center">
		<section className=" relative flex w-[400px] flex-col items-start justify-center py-10 px-5 max-sm:shadow-none shadow-xl shadow-slate-600">
			<div className="flex flex-row mb-4 items-center justify-start">
				<Image height={32} width={32} alt="Logo" src="/logo.svg" />	
				<p className="text-lg font-bold ml-2 ">Hostel Premier League</p>
			</div>	
			<p className="font-bold text-md mb-5">Payment</p>
	    <label className='w-full mb-6 text-4xl text-indigo-500 font-extrabold text-center'>₹200</label>
	    <div className="w-full mb-10 grid place-items-center">
	    	<Image height={128} width={128} alt="qr_code_image" src="/assets/qr_code.svg"/>
	    </div>
	    <FileUpload userData={session.user} />
		</section>
	</div>
	);
	
}

export default Payment;
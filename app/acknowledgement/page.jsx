import Image from 'next/image';
import Link from 'next/link';
import Rules from '@components/Rules'
import {LoginButton} from '@components/ClientComponents';

import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';
import {redirect} from 'next/navigation';

const Acknowledgement=async()=>{
	const session=await getServerSession(authOptions);
	if(session?.user){
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center py-20">
			<Rules/>
			<section className="w-3/5 max-md:w-full max-sm:w-[calc(100%-50px)] py-7 px-5 mb-10 flex flex-col items-center">
				<span className="w-full text-center mb-5">I hereby acknowledge and accept the rules set forth for the cricket match, understanding the importance of fair play, sportsmanship, and adherence to each specified regulation. By accepting these rules, I also agree to comply with the <Link className="text-blue-600 font-semibold hover:underline" href="/terms-and-conditions">Terms and Conditions</Link> governing this cricket event.</span>
				<LoginButton />
			</section>
		</div>
	);
};

export default Acknowledgement;
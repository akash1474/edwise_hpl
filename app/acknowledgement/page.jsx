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
		<div className="flex flex-col items-center">
			<Rules/>
			<section className="w-4/5 max-sm:w-[calc(100%-50px)] py-7 px-5 mb-10 flex flex-col items-center">
				<p className="w-full text-center mb-5">I hereby acknowledge and accept the rules set forth for the cricket match, understanding the importance of fair play, sportsmanship, and adherence to each specified regulation</p>
				<LoginButton />
			</section>
		</div>
	);
};

export default Acknowledgement;
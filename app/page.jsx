import {getServerSession} from 'next-auth';
import authOptions from '@utils/auth.js';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'


import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Verification from '@components/Verification';
import FAQComponent from '@components/FAQComponent';
const CountDownTimer = dynamic(() => import('@components/CountDownTimer'), {ssr: false});
import Step from '@components/Step'
import frequentQuestions from '@utils/faqs.js';

export default async function Home() {
  const session=await getServerSession(authOptions);
  console.log(session);
  const targetDate = new Date('2023-12-31T23:59:59');
  return (
    <div className="w-full flex flex-col items-center relative">
      {
        session?.user ?  <Verification user={session.user}/> : null
      }


      <section className="w-4/5 h-15 flex flex-row items-center justify-center py-10 max-md:flex-col max-sm:w-full">
        <div className="flex flex-col max-md:items-center">
          <p className="mt-5 text-5xl font-extrabold max-md:text-center max-sm:text-4xl">Welcome to Hostel Premier League</p>
          <p className=" text-4xl font-extrabold green_gradient max-md:text-center">A Thrilling Cricket Experience</p>
          <p className="text-slate-600 font-medium w-1/2 my-4 max-md:text-center max-sm:w-3/4">Experience the thrill of the game, witness top teams in action, and create lasting memories at this unmissable sporting spectacle.</p>
          <Link href="/learn-more">
            <span className="btn_black w-fit rounded-sm group">
              <InformationCircleIcon className="h-5 w-5 text-white mr-2 group-hover:text-black transition-colors duration-75" />
              Learn More
            </span>
          </Link>
        </div>
        <Image 
          src="/assets/batsman.jpg"
          height={350}
          width={350}
          alt="Batsman"
        />
      </section>


      {
        session?.user ? 
          (<div className="max-md:flex-col w-4/5 max-w-7xl rounded-lg bg-white border border-slate-300 mb-10 py-6 px-16 flex flex-row items-center justify-between max-sm:px-5 max-sm:py-0">
            <div className="flex flex-col max-md:order-2 max-md:mb-5">
              <div className="text-2xl font-extrabold mb-5 max-md:w-full max-md:text-center">
                <p className="text-teal-500 max-md:w-full max-md:text-center text-3xl">Manage Your Team</p>
                Enter/Verify your team details by clicking on the button
              </div>
              <Link href="/team-details">
                <button type="button" className="btn_black rounded-sm w-fit max-md:w-full">View/Fill Team Details</button>
              </Link>
            </div>
            <Image
              src="/assets/team.jpg"
              height={192}
              width={192}
              className="max-sm:w-[192px] rounded-md max-md:order-1 max-md:my-5"
              alt="Batsman"
            />
          </div>)
        :null
      }

{/*      <section className="w-full h-16 relative bg-indigo-300 flex items-center justify-center max-sm:w-full">
        <div className="w-4/5 h-full max-w-7xl relative bg-indigo-400 py-6 px-16 flex flex-row items-center justify-between">
          <p className="text-3xl text-white font-extrabold absolute top-4 left-4">Team Details</p>
        </div>
      </section>
*/}

      <section className="w-4/5 h-15 flex flex-row items-center justify-center py-10 max-md:flex-col max-sm:w-full">
        <CountDownTimer targetDate={targetDate}/>
      </section>
      

      <section id="info" className="w-4/5 max-w-7xl  flex flex-col items-center justify-center py-10 mt-10 max-sm:w-full">
        <p className="text-5xl mb-5 font-extrabold max-md:text-4xl max-sm:text-3xl max-md:text-center">Team Registration Process</p>
        <Step 
          number="#1"
          title="Captain Login/Signup"
          img="/assets/login.svg"
          desc="Captain or Any one player player from the team must signup and perform the registration process."
        />
        <Step 
          number="#2"
          title="Team Creation"
          img="/assets/our_team.svg"
          desc="Enter the team name and description(optional) and submit it."
        />
        <Step 
          number="#3"
          title="Details Submission"
          img="/assets/personal_data.jpg"
          desc="Enter your teammates' vital info. Player names, ages, emails, and mobile numbers – the essentials for a well-formed team. Precision ensures a seamless registration process."
        />
        <Step 
          number="#4"
          title="Payment Process"
          img="/assets/payment.svg"
          desc="Secure your team's spot by scanning the QR Code and completing the registration fees payment. Upload you payment receipt(screenshot)."
        />
        <Step 
          number="#5"
          title="Payment Confirmation"
          img="/assets/completed.svg"
          desc="Await the email confirming your payment. Once received, victory is near! Your team is officially part of the cricket spectacle – ready to compete."
        />
      </section>
      <section className="w-full bg-indigo-500 flex items-center justify-center py-16 ">
        <div className="max-md:flex-col w-4/5 max-w-7xl rounded-lg bg-white py-6 px-16 flex flex-row items-center justify-between max-sm:px-5 max-sm:py-0">
          <div className="flex flex-col max-md:items-center">
            <div className="text-4xl font-extrabold mb-5 max-sm:text-2xl max-md:w-full max-md:text-center max-sm:mt-10">
              <p className="text-indigo-500">Secure Your Spot!</p>
              Register now for an unforgettable cricket event.
            </div>
            <Link href="/learn-more">
              <p className="btn_primary rounded-sm w-fit">Learn More</p>
            </Link>
          </div>
          <Image
            src="/assets/fever.svg"
            height={350}
            width={350}
            className="max-sm:w-[256px]"
            alt="Batsman"
          />
        </div>
      </section>
      <section id="faq" className="w-4/5 max-sm:w-full py-24 px-6 max-w-[80rem] mx-auto">
        <div className="max-w-[56rem] mx-auto flex flex-col w-full">
          <p className="text-3xl font-extrabold mb-8">Frequently Asked Questions</p> 
          <div className="flex flex-col items-center">
            {
              frequentQuestions.map((data)=><FAQComponent key={data.question} data={data} />)
            }
          </div>
        </div>
      </section>
      </div>)
}

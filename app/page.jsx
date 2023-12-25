import Image from 'next/image'
import Step from '@components/Step'

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center relative">
      <section className="w-4/5 h-15 flex flex-row items-center justify-center py-10 max-md:flex-col max-sm:w-full">
        <div className="flex flex-col max-md:items-center">
          <p className="mt-5 text-5xl font-extrabold max-md:text-center max-sm:text-4xl">Welcome to Hostel Premier League</p>
          <p className=" text-4xl font-extrabold green_gradient max-md:text-center">A Thrilling Cricket Experience</p>
          <p className="text-slate-600 font-medium w-1/2 my-4 max-md:text-center max-sm:w-3/4">Experience the thrill of the game, witness top teams in action, and create lasting memories at this unmissable sporting spectacle.</p>
          <button type="button" className="black_btn">Learn More</button>
        </div>
        <Image 
          src="/assets/batsman.jpg"
          height={350}
          width={350}
          alt="Batsman"
        />
      </section>
      <section className="w-full h-16 relative bg-indigo-300 flex items-center justify-center max-sm:w-full">
        <div className="w-4/5 h-full max-w-7xl relative bg-indigo-400 py-6 px-16 flex flex-row items-center justify-between">
          <p className="text-3xl text-white font-extrabold absolute top-4 left-4">Schedule</p>
        </div>
      </section>
      <section className="w-4/5 max-w-7xl  flex flex-col items-center justify-center py-10 mt-10 max-sm:w-full">
        <p className="text-5xl mb-5 font-extrabold max-md:text-4xl max-md:text-center">Team Registration Process</p>
        <Step 
          number="#1"
          title="Captain Login/Signup"
          img="/assets/login.svg"
          desc="Experience the thrill of the game, witness top teams in action, and create lasting memories at this unmissable sporting spectacle."
        />
        <Step 
          number="#2"
          title="Team Creation"
          img="/assets/our_team.svg"
          desc="Build your dream team! Provide player details - names, ages, emails, and mobile numbers. Let the cricket battle commence with your chosen squad"
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
          desc="Secure your team's spot by scanning the QR Code and completing the registration fees payment. Capture the transaction with a screenshot for your records."
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
          <div className="flex flex-col">
            <div className="text-4xl font-extrabold mb-5 max-sm:text-2xl max-sm:mt-10">
              <p className="text-indigo-500">Secure Your Spot!</p>
              Register now for an unforgettable cricket event.
            </div>
            <button type="button" className="primary_btn">Learn More</button>
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
      </div>)
}

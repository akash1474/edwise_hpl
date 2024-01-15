import Rules from '@components/Rules'
import Image from 'next/image'

const LearnMore=()=>{
	return(
		<div className="w-full flex flex-col items-center py-20">
			<div className="w-full flex flex-wrap justify-center max-md:w-full gap-10">
				<Rules />
				<section className="w-[600px] border border-slate-200 max-sm:w-[calc(100%-50px)] py-7 px-5 rounded-md">
					<span className="mb-10 text-lg font-semibold flex flex-col items-center">
						<Image src="/assets/paymentx.svg" height={300} width={300} alt="playment" className="" />
						<p className="text-gray-900 font-black text-3xl text-center">Payment</p>
					</span>
					<ul className="space-y-1 text-gray-600 text-base list-disc ml-5 flex flex-col gap-4">
					  <li>Registration requires a payment of Rs 200, ensuring commitment to the event.</li>
					  <li>Complete payment by scanning the provided QR code, simplifying the process for a seamless transaction experience.</li>
					  <li>After payment, upload a screenshot for verification, confirming your registration with a visual confirmation.</li>
					  <li>Expect an email within 24 hours, confirming successful registration once payment is verified, providing assurance and acknowledgment of participation.</li>
					</ul>
				</section>
			</div>
		</div>
	);
};

export default LearnMore;
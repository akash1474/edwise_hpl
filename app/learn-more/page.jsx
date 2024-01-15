import Rules from '@components/Rules'
import Image from 'next/image'

const LearnMore=()=>{
	return(
		<div className="flex flex-col items-center">
			<Rules />
			<section className="w-4/5 border border-slate-200 max-sm:w-[calc(100%-50px)] py-7 px-5 mb-10">
				<span className="mb-10 text-lg font-semibold flex flex-col items-center">
					<Image src="/assets/payment.jpg" height={300} width={300} alt="playment" className="" />
					<p className="text-gray-900 font-black text-3xl text-center">Payment</p>
				</span>
				<ul className="space-y-1 text-gray-600 text-base list-disc ml-5">
				  <li>Registration requires a payment of Rs 200, ensuring commitment to the event.</li>
				  <li>Complete payment by scanning the provided QR code, simplifying the process for a seamless transaction experience.</li>
				  <li>After payment, upload a screenshot for verification, confirming your registration with a visual confirmation.</li>
				  <li>Expect an email within 24 hours, confirming successful registration once payment is verified, providing assurance and acknowledgment of participation.</li>
				</ul>
			</section>

		</div>
	);
};

export default LearnMore;
import Rules from '@components/Rules'
import { CreditCardIcon } from '@heroicons/react/outline'
import Image from 'next/image';

const PrivacyPolicy=()=>{
	return(
		<div className="h-min-[100vh] h-fit flex flex-col items-center">
			<section className="w-[600px] max-md:w-full max-sm:w-[calc(100%-50px)] py-7 px-5 my-10 border border-slate-300 rounded-md">
				<span className="mb-20 text-lg font-semibold flex flex-col items-center">
					<Image src="/assets/terms.svg" height={300} width={300} alt="privacy_policy" className="" />
					<p className="text-gray-900 font-black text-3xl text-center">Terms & Conditions</p>
				</span>
				<ul className="space-y-1 text-gray-600 text-base list-disc ml-5 flex flex-col gap-5">
				  <li><p className="text-lg font-bold text-gray-900">Acceptance of Terms</p>By participating in the Hostel Premier League (HPL), users agree to comply with these terms and conditions.</li>
				  <li><p className="text-lg font-bold text-gray-900">Eligibility</p>Participants must meet the eligibility criteria specified by HPL. Only registered teams will be considered for participation.</li>
				  <li><p className="text-lg font-bold text-gray-900">Team Registration</p>The captain is responsible for accurate team registration. Any false information may result in disqualification.</li>
				  <li><p className="text-lg font-bold text-gray-900">Event Conduct</p>Participants must adhere to fair play and sportsmanship. Any form of misconduct may lead to penalties or disqualification.</li>
				  <li><p className="text-lg font-bold text-gray-900">Team Composition</p>Teams must comply with the specified number of players and other requirements. Changes to team composition require prior approval.</li>
				  <li><p className="text-lg font-bold text-gray-900">Payment</p>Registration fees are non-refundable. Payment confirmation is required for participation.</li>
				  <li><p className="text-lg font-bold text-gray-900">Schedule</p>Teams must adhere to the schedule provided by HPL. Failure to do so may result in forfeiture.</li>
				  <li><p className="text-lg font-bold text-gray-900">Event Changes</p>HPL reserves the right to make changes to the event schedule, rules, or any other aspect, with prior notice.</li>
				  <li><p className="text-lg font-bold text-gray-900">Intellectual Property</p>All content, logos, and trademarks associated with HPL are the property of the organizers.</li>
				  <li><p className="text-lg font-bold text-gray-900">Liability</p>HPL organizers are not responsible for injuries, damages, or losses incurred during the event.</li>
				</ul>
			</section>

		</div>
	);
};

export default PrivacyPolicy;
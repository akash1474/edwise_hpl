import Rules from '@components/Rules'
import Image from 'next/image';
import { CreditCardIcon } from '@heroicons/react/outline'

const PrivacyPolicy=()=>{
	return(
		<div className="h-min-[100vh] h-fit flex flex-col items-center">
			<section className="w-[600px] max-md:w-full max-sm:w-[calc(100%-50px)] py-7 px-5 my-10 border border-slate-300 rounded-md">
				<span className="mb-20 text-lg font-semibold flex flex-col items-center">
					<Image src="/assets/policy_2.avif" height={300} width={300} alt="privacy_policy" className="" />
					<p className="text-gray-900 font-black text-3xl text-center">Privacy Policy</p>
				</span>
				<ul className="space-y-1 text-gray-600 text-base list-disc ml-5 flex flex-col gap-5">
				  <li><p className="text-lg font-bold text-gray-900">Information Collection</p>HPL collects and stores necessary participant information for event management.</li>
				  <li><p className="text-lg font-bold text-gray-900">Data Security</p>Measures are in place to secure participant data. Access is restricted to authorized personnel only.</li>
				  <li><p className="text-lg font-bold text-gray-900">Data Usage</p>Participant data is used solely for event-related purposes, such as communication and team management.</li>
				  <li><p className="text-lg font-bold text-gray-900">Third-Party Services</p>HPL may use third-party services for certain event functions. Participants are subject to the privacy policies of these services.</li>
				  <li><p className="text-lg font-bold text-gray-900">Communication</p>Participants may receive event updates and relevant information via email or other communication channels.</li>
				  <li><p className="text-lg font-bold text-gray-900">Data Sharing</p>Participant data will not be shared with third parties except as required by law or with explicit consent.</li>
				  <li><p className="text-lg font-bold text-gray-900">Data Access and Correction</p>Participants can request access to their data and request corrections if needed.</li>
				  <li><p className="text-lg font-bold text-gray-900">Policy Changes</p>HPL reserves the right to update the privacy policy. Participants will be notified of any significant changes.</li>
				</ul>
			</section>
		</div>
	);
};

export default PrivacyPolicy;
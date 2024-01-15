import Link from 'next/link'
import Image from 'next/image'


const Footer =()=>{
	return (<div className="text-white  py-10 bg-gray-800 flex items-center justify-center  w-full ">
		<div className="footer-container container flex flex-row items-start justify-between px-10 max-sm:flex-col max-sm:items-center max-sm:h-[450px]">
			<section className="sponser-contaier flex items-start">
				<Image src="/logo.svg" className="mr-2" height={32} width={32} alt="logo" />
				<section className="sponser-info flex flex-col items-start justify-between">
					<p className="text-lg font-bold mb-1">Hostel Premier League</p>	
					<p className="text-slate-400 text-sm mb-3">Powered By</p>
					<Link target="_blank" href="https://www.edwiseinternational.com/">
						<Image src="/assets/edwise.svg" height={60} width={110} className="w-auto h-auto" alt="sponser-edwise-international" />
					</Link>
				</section>
			</section>
			<section className="imp-links flex flex-col justify-between gap-2">
				<p className="text-lg font-bold mb-4">Important Links</p>
				<Link href="https://www.edwiseinternational.com/study-abroad-consultants/about.aspx" target="_blank" className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300" >About Us</Link>
				<Link href="/contact-us" className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300" >Contact Us</Link>
				<Link href="/terms-and-conditions" className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300" >Terms & Conditions</Link>
				<Link href="/privacy-policy" className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300" >Privacy Policy</Link>
			</section>
			<section className="flex-col">
				<p className="text-lg font-bold mb-4">Social Links</p>
				<section className="flex">
					<Link href="https://www.instagram.com/edwiseint" target="_blank" className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md  transition-colors duration-100 mr-2" >
						<Image src="/assets/instagram.svg" height={32} width={32} alt="instagram" />
					</Link>
					<Link href="https://www.facebook.com/edwiseinternational" target="_blank" className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md transition-colors duration-100 mr-2" >
						<Image src="/assets/facebook.svg" height={32} width={32} alt="facebook" />
					</Link>
					<Link href="https://www.linkedin.com/company/edwise-international/?originalSubdomain=in" target="_blank" className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md transition-colors duration-100" >
						<Image src="/assets/linkedin.svg" height={32} width={32} alt="linkedin" />
					</Link>
				</section>
			</section>
			
		</div>
	</div>);
}

export default Footer;
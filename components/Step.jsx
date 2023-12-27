import Image from 'next/image'
const Step =({img,title,desc,number})=>(
	<div className="w-5/6 relative rounded-md px-6 flex border-2 mb-8 py-6 border-slate-800 flex-row items-center max-md:flex-col">
	 <p className="absolute font-extrabold text-4xl right-4 top-4 max-sm:text-3xl">{number}</p>
		<Image
			src={img}
			height={128}
			width={128}
			alt="img"
			className="mr-5 max-md:mb-5 max-sm:w-[196px] max-sm:h-[196px]"
		/>	
		<div className="flex flex-col max-md:items-center">
			<p className="font-bold text-black text-3xl mb-2 max-md:text-center max-sm:text-2xl">{title}</p>	
			<p className="font-medium text-lg text-slate-700 max-md:text-center max-sm:text-base">{desc}</p>	
		</div>
	</div>
);

export default Step;
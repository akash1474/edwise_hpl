import Image from 'next/image'

const Loading=()=>{
	return <div className="h-[100vh] w-full grid place-items-center">
		<Image src="/assets/spinner.svg" height={42} width={42} alt="Loading..." />
	</div>
}

export default Loading;
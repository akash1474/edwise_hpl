import Image from 'next/image'

const Loading=()=>{
	return <div className="spinner_container w-full">
		<Image className="spinner_cls" src="/assets/spinner.svg" height={40} width={40} alt="Loading..." />
	</div>
}

export default Loading;
"use client";
import {useEdgeStore} from "@components/edgestore"
import {useState,useEffect,useRef} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Image from 'next/image';

const FileUpload=({userData})=>{
	const [file,setFile]=useState();
	const { edgestore } = useEdgeStore();
	const [isUploading,setIsUploading]=useState(false);
	const [progress,setProgress]=useState(0);
	const [isUploaded,setIsUploaded]=useState(false);
	const imgRef=useRef();

	const updateDatabase=async(url)=>{
		try{
			console.log(url);
			const res=await fetch(`/api/users/${userData.id}`,{
				method:'PATCH',
				body:JSON.stringify({
					image_url:url,
				})
			});
			const user=await res.json();
			toast.success("Payment Receipt Uploaded Successfully!");
			localStorage.setItem("user",JSON.stringify(user));
		}catch(err){
			console.log(err);
		}
	}

	const handleFileSubmit=async(e)=>{
		e.target.blur();
		if(!file){
			toast.error("Please select a file");
			return;
		}
		setIsUploading(true);
		const res = await edgestore.publicFiles.upload({
			file,
			onProgressChange: (progress) => {
			setProgress(progress);
			},
		});
		setIsUploading(false);
		setIsUploaded(true);

	    await updateDatabase(res.url);
	    setTimeout(()=>{
	    	document.location=window.location.origin;
	    },2000);
	}

	const handleFile=(e)=>{
		if(!e.target.files.length){
			setFile(undefined);
			toast.error("Please select a file");
			return;
		}
		const currFile=e.target.files?.[0];
		if(!currFile.type.startsWith('image/')){
			toast.error("Please select an image file");
			return;
		}
		if(currFile.size > (1024*1024)){
			toast.error("File size is greater than 1MB");
			return;
		}
		if (currFile) {
			const reader = new FileReader();
			reader.onload = (e) => { 
				setFile(currFile);
				imgRef.current.src=e.target.result;
			};
			reader.readAsDataURL(currFile);
	    }
	}

	return(
		<>
		  	<label className='w-full mb-6 text-4xl green_gradient font-black text-center'>₹200</label>
		    <div className="w-full mb-10 grid place-items-center">
		    	<Image ref={imgRef} height={file ? 400 : 128} width={file ? 192  : 128} alt="qr_code_image" src="/assets/qr_code.svg"/>
		    </div>
			<div className="w-full mb-5">
				<label className='mb-2 block text-base font-medium text-black'>Upload Screenshot of Playment Receipt</label>
				<input
					type='file'
					onChange={handleFile}
					className='w-full cursor-pointer rounded-md border border-slate-300 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-gray-2 file:py-2 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-indigo-500 file:hover:bg-opacity-10 focus:border-indigo-500 active:border-indigo-500 disabled:cursor-default disabled:bg-gray-2'
				/>
			</div>
			<button type="button" onClick={isUploaded ? ()=>{} : handleFileSubmit} className={isUploaded ? "w-full bg-teal-500 cursor-default font-medium rounded-sm py-1 text-white" :"btn_black w-full rounded-sm font-medium"}>
			{
				isUploading ? 
				<span className="flex items-center gap-2 h-full">
					<svg aria-hidden="true" className="inline w-6 h-6 animate-spin text-gray-600 fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
				    </svg>
				    <p className="font-medium mt-1">{`Uploading (${progress}%)`}</p>
				</span>
				: isUploaded ? "Receipt Uploaded Successfully":"Upload Playment Receipt"
			}
			</button>
		</>
	)

}

export default FileUpload;
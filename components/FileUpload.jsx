"use client";
import {useEdgeStore} from "@components/edgestore"
import {useState,useEffect} from 'react';

const FileUpload=({userData})=>{
	const [file,setFile]=useState();
	const { edgestore } = useEdgeStore();
	const [isUploading,setIsUploading]=useState(false);
	const [progress,setProgress]=useState(0);
	const [isUploaded,setIsUploaded]=useState(false);

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
			localStorage.setItem("user",JSON.stringify(user));
		}catch(err){
			console.log(err);
		}
	}

	const handleFileSubmit=async(e)=>{
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

	return(
		<>
			<div className="w-full mb-5">
				<label className='mb-2 block text-base font-medium text-black'>Upload Screenshot of Playment Receipt</label>
				<input
					type='file'
					onChange={(e)=>{
						setFile(e.target.files?.[0]);
					}}
					className='w-full cursor-pointer rounded-md border border-slate-300 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-gray-2 file:py-2 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-indigo-500 file:hover:bg-opacity-10 focus:border-indigo-500 active:border-indigo-500 disabled:cursor-default disabled:bg-gray-2'
				/>
			</div>
			<button type="button" onClick={isUploaded ? ()=>{} : handleFileSubmit} className={isUploaded ? "w-full bg-teal-500 cursor-default rounded-sm py-1 text-black font-medium" :"login_btn"}>
			{
				isUploading ? `Uploading (${progress}%)`: isUploaded ? "Receipt Uploaded Successfully":"Upload Playment Receipt"
			}
			</button>
		</>
	)

}

export default FileUpload;
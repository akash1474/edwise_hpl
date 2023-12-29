"use client";
import {useEdgeStore} from "@components/edgestore"
import {useState,useEffect} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';

const FileUpload=({userData})=>{
	const [file,setFile]=useState();
	const { edgestore } = useEdgeStore();
	const [isUploading,setIsUploading]=useState(false);
	const [progress,setProgress]=useState(0);
	const [isUploaded,setIsUploaded]=useState(false);
	const [error,setError]=useState({
		exists:false,
		msg:"This is the error"
	});

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
		if(!file){
			setError({ exists:true,msg:"Please select a file"})
			return;
		}
		if(file.size > (1024*1024)){
			setError({exists:true,msg:"File size is greater than 1MB"});
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
			setError({
				exists:true,
				msg:"Please select a file"
			});
			return;
		}
		if(e.target.files?.[0].size > (1024*1024)){
			setError({
				exists:true,
				msg:"File size is greater than 1MB"
			});
			return;
		}
		setError(false);
		setFile(e.target.files?.[0])
	}

	return(
		<>
			<div className="w-full mb-5">
				<label className='mb-2 block text-base font-medium text-black'>Upload Screenshot of Playment Receipt</label>
				<input
					type='file'
					onChange={handleFile}
					className='w-full cursor-pointer rounded-md border border-slate-300 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-gray-2 file:py-2 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-indigo-500 file:hover:bg-opacity-10 focus:border-indigo-500 active:border-indigo-500 disabled:cursor-default disabled:bg-gray-2'
				/>
			</div>
			{
				error.exists ? 
				(<div className="px-2 py-3 bg-rose-200 w-full mb-5 flex items-center justify-between">
					<p className="text-rose-500">{error.msg}</p>
					<XMarkIcon onClick={()=>{
						setError((prev)=>{
							return {msg:"",exists:false}
						});
					}} className="h-5 w-5 ml-2 min-h-5 min-w-5 text-rose-500 cursor-pointer hover:text-rose-700" />
				</div>):null
			}
			<button type="button" onClick={isUploaded ? ()=>{} : handleFileSubmit} className={isUploaded ? "w-full bg-teal-500 cursor-default rounded-sm py-1 text-white" :"btn_primary w-full rounded-sm"}>
			{
				isUploading ? `Uploading (${progress}%)`: isUploaded ? "Receipt Uploaded Successfully":"Upload Playment Receipt"
			}
			</button>
		</>
	)

}

export default FileUpload;
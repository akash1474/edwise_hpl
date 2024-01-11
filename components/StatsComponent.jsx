const StatsComponent=({title,value,children,color,bgcolor,side})=>{
	return (
		<section className={`${bgcolor} p-5 flex flex-row items-center gap-10 rounded-sm px-5 max-sm:w-full relative`}>
			<p className={`w-1.5 ${side} h-4/5 absolute top-0.1 left-0 rounded-r-md`}></p>
			<span className="flex flex-col justify-between h-full gap-2 w-full">
				<p className="text-sm font-medium">{title}</p>
				<p className={`text-3xl font-bold ${color}`}>{value}</p>
			</span>
			{children}
		</section>
	);
}

export default StatsComponent;
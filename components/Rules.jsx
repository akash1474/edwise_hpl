
const Rules=()=>{
	const highlight="text-gray-900 font-medium";
	return (
		<section className="w-4/5 border border-slate-200 max-sm:w-[calc(100%-50px)] py-7 px-5 my-10">
			<h2 className="mb-2 text-lg font-semibold text-gray-900">Rules:</h2>
			<ul className="space-y-1 text-gray-500 list-disc ml-5">
				<li><span className={highlight}>Teams can be of 8, 10, or 13 members </span> — flexibility for squad size adds strategic depth to the game.</li>
				<li><span className={highlight}>Engage in an intense 8 over battle </span> - where every ball counts towards victory.</li>
				<li><span className={highlight}>Allow a 10-15 minute breather between innings </span> — time for tactics and regrouping.</li>
				<li><span className={highlight}>No runners allowed</span> — each player must own their runs and face the consequences.</li>
				<li><span className={highlight}>A wide ball grants 1 run</span> — precision bowling is key, and every run matters.</li>
				<li><span className={highlight}>No CBW (Caught Behind Wicket) calls</span> —focus on clean catches and skilled dismissals.</li>
				<li><span className={highlight}>Eliminate Leg Bye runs</span> — batting precision takes precedence.</li>
				<li><span className={highlight}>No overthrow runs </span> — strict adherence to the rules ensures fair play.</li>
				<li><span className={highlight}>Punctuality is paramount </span> — teams must report on time, ensuring a smooth and timely match.</li>
				<li><span className={highlight}>The empire's decision is final </span> — upholding the spirit of the game and respecting authority.</li>
				<li><span className={highlight}>Teams allowed only 1 substitution </span> — strategic use of substitutions for optimal team performance.</li>
			</ul>
		</section>
	);
}

export default Rules;
import Image from "next/image";
import TeamTypeForm from "@components/TeamTypeForm";

import { redirect } from "next/navigation";
import { connectToDB } from "@utils/database";

import { getServerSession } from "next-auth";
import authOptions from "@utils/auth.js";

import Team from "@models/team.js";

const TeamTypePage = async () => {
	let session = await getServerSession(authOptions);
	if (!session?.user || session.user.has_type){
		return redirect('/team-details');
	}

	return (
		<div className="flex justify-center min-h-[calc(100vh-200px)] h-fit items-center">
			<section className="flex flex-col h-full items-center w-5/6 py-10">
				<p className="blue_gradient py-1 text-4xl font-black w-full text-center">Select Your Team Type</p>
				<TeamTypeForm />
			</section>
		</div>
	);
};

export default TeamTypePage;

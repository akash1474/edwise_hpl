import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@utils/auth.js";
import FileUpload from "@components/FileUpload";
import { redirect } from "next/navigation";

const Payment = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user || session?.user.payment) {
		return redirect("/");
	}

	return (
		<div className="h-fit min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
			<form className=" relative flex w-[400px] h-full flex-col items-start justify-center py-10 px-5 my-10 max-sm:shadow-none shadow-xl shadow-slate-600">
				<div className="flex flex-row mb-4 items-center justify-start">
					<Image height={32} width={32} alt="Logo" src="/logo.svg" />
					<p className="text-lg font-bold ml-2 ">Hostel Premier League</p>
				</div>
				<p className="font-bold text-md mb-5">Payment</p>
				<FileUpload userData={session.user} />
			</form>
		</div>
	);
};

export default Payment;

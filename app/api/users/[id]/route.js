// import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import User from '@models/user';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const user = await User.findById(params.id);

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}

export const PATCH =async(req,{params})=>{
    const {image_url}=await req.json();
    try{
        await connectToDB();
        console.log(image_url);
        const user=await User.findByIdAndUpdate(params.id,{
            payment:true,
            receipt:image_url,
            verified:false
        },{
            new:true,
            runValidators:true
        });
        if(!user){
            console.log("No user found");
            return new Response("Failed to update user", { status: 500 })
        }

        return new Response(JSON.stringify(user), { status: 200 })
    }catch(err){
        console.log(err);
        return new Response("Failed to update user", { status: 500 })
    }
}
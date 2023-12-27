import mongoose from 'mongoose'

let isConnected=false;

export const connectToDB=async()=>{
	mongoose.set('strictQuery',true)

	if(isConnected){
		console.log('DB Connection Established');
		return;
	}

	try{
		await mongoose.connect(process.env.MONGODB_URI,{
			dbName:'hpl_teams',
			useNewUrlParser:true,
			useUnifiedTopology:true,
		})

		isConnected=true;
		console.log("MongoDB Connected");
	}catch(err){
		console.log(err);
	}
}
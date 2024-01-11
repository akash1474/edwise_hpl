import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      console.log(sessionUser);
      session.user.id = sessionUser._id.toString();
      session.user.payment=sessionUser.payment;
      session.user.receipt=sessionUser.receipt;
      session.user.verified=sessionUser.verified;
      session.user.has_type=sessionUser.has_type;
      session.user.is_admin=sessionUser.is_admin;
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            payment:false,
            receipt:"",
            verified:false,
            has_type:false,
            is_admin:false
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
}

export default authOptions;
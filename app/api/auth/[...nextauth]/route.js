import NextAuth from 'next-auth';
import authOptions from '@utils/auth.js';


// console.log(process.env.GOOGLE_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

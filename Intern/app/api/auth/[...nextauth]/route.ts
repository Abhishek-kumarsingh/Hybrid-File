import NextAuth from "next-auth/next";
import { authOptions } from "./option";

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST , handler as PUT , handler as DELETE}
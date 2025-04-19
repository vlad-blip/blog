import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import adminData from '../admin.json'

const admins = adminData.admins;

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
            if (!auth?.user?.email || !admins) return false;

            return admins.includes(auth?.user?.email)
        }
    }
})
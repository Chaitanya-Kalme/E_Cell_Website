import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req): Promise<any> {
                try {
                    const email = credentials?.email
                    const password = credentials?.password as string

                    // check User exist or not.
                    const isUserExist = await prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    })

                    if (!isUserExist) {
                        return NextResponse.json({
                            success: false,
                            message: "User is not registered with this email."
                        }, { status: 400 })
                    }

                    // Checking if password is correct.
                    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);

                    if (!isPasswordCorrect) {
                        return NextResponse.json({
                            success: false,
                            message: "Password is incorrect"
                        }, { status: 400 })
                    }

                    if (!isUserExist.isVerified) {
                        return NextResponse.json({
                            success: false,
                            message: "User is not Verified."
                        }, { status: 400 })
                    }

                    return isUserExist


                } catch (error: any) {
                    throw new Error(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                    token.email = user.email
                token.isVerified = user.isVerified
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.isVerified = token.isVerified
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
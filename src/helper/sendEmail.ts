import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"



export const sendEmail = async({email, emailType, userId}: {
    email: string,
    emailType: string,
    userId: string
}) => {
    try {
        // Creating verification code and verification code expiry date and time, 3600000 is in millisecond.
        const verificationCode = (Math.floor(100000 + Math.random()*999999)).toString()
        const verificationCodeExpiry = new Date(Date.now() + 3600000);

        //  finding user and updating user on different type of email.
        let user;
        if(emailType==="VERIFY"){
            user = await prisma.user.update({
                where:{
                    id: userId
                },
                data:{
                    verificationCode: verificationCode,
                    verificationCodeExpiry: verificationCodeExpiry
                }
            })
        }

        else{
            return NextResponse.json({
                success: false,
                message: "email Type is not correct"
            },{status: 500})
        }

        // Email Send logic
        
        return NextResponse.json({
            success: true,
            data: {user},
            message: "Email Send Successfully"
        },{status: 200})

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
        
    }
}
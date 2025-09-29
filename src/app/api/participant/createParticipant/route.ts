import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    try {
        
        // Taking the user id
        const participationData = await req.formData()
        const teamName = participationData.get("teamName") as string
        const eventId = participationData.get("eventId") as string
        const userIds = participationData.getAll("userIds") as string[]

        const event = await prisma.event.findFirst({
            where:{
                id: eventId
            }
        })

        // Checking information is provided or not. 
        if(!event){
            return NextResponse.json({
                sucess: false,
                message: "Event Does not exists."
            },{status: 400})
        }
        if(userIds.length<=0) {
            return NextResponse.json({
                success: false,
                message: "User ids are required."
            },{status: 400})
        }
        else if(userIds.length>1 && !teamName){
            return NextResponse.json({
                success: false,
                message: "Team Name is required"
            },{status: 404})
        }
    
        if(event.isRegistrationOpen===false){
            return NextResponse.json({
                success: false,
                message: "Registration is Closed for this event."
            },{status: 400})
        }

        if(userIds.length<event.minSize || userIds.length>event.maxSize){
            return NextResponse.json({
                success: false,
                message: "Users must be in range"
            },{status: 400})
        }
        for(let i=0;i<userIds.length;i++){
            const user  = await prisma.user.findFirst({
                where:{
                    id: userIds[i]
                },
                include:{
                    participation: true
                }
            })

            if(!user || !user.isVerified){
                return NextResponse.json({
                    success: false,
                    message: `User ${user?.userName} does not exist or is not verified.`
                },{status: 400})
            }
            if(user.participation.some((participant) =>participant.eventId===eventId)){
                return NextResponse.json({
                    success: false,
                    message: `User ${user.userName} already registered for this event.`
                },{status:400})
            }
        }

        // Fees Payment Logic
        let feesPaid = false
        if(event.eventFees===0){
            feesPaid=true
        }
        else{
            
            feesPaid=true
        }


        const participation = await prisma.participant.create({
            data:{
                TeamName:teamName,
                eventId: eventId,
                participants: {connect: userIds.map(id =>({id}))},
                feesPaid: feesPaid
            }
        })

        return NextResponse.json({
            success: true,
            message: "Participation is created successfully"
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message
        },{status:500})
        
    }
}
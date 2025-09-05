import { parseDateAndTime } from "@/helper/parseDateAndTime";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    try {

        // Check that the user is admin or not.
        

        // Extracting information from the request
        // Expecting Date in format: DD/MM/YYYY
        // Expecting Time in format: HH:MM:SS
        const eventInfo = await req.json()
        const eventName = eventInfo.eventName as string
        const eventDate= eventInfo.eventDate as string
        const eventTime = eventInfo.eventTime as string
        const eventFees = parseFloat(eventInfo.eventFees)
        const minSizeOfTeam = parseInt(eventInfo.minSize)
        const maxSizeOfTeam = parseInt(eventInfo.maxSize)
        
        if(!eventName || !eventDate || !eventTime || !eventFees || !minSizeOfTeam || !maxSizeOfTeam){
            return NextResponse.json({
                success: false,
                message: "All Fields are required"
            },{status: 404})
        }

        // Check Event Already exists or not.
        const isEventExist = await prisma.event.findFirst({
            where: {
                eventName: eventName
            }
        })

        if(isEventExist){
            return NextResponse.json({
                success: false,
                message: "Event Already Exists"
            },{status: 400})
        }

        const dateAndTime = parseDateAndTime(eventDate, eventTime) as Date

        if(dateAndTime<=new Date(Date.now())){
            return NextResponse.json({
                success: false,
                message: "Invalid Date"
            },{status: 400})
        }

        const createdEvent = await prisma.event.create({
            data:{
                eventName,
                eventDateAndTime: dateAndTime,
                eventFees,
                minSize: minSizeOfTeam,
                maxSize: maxSizeOfTeam,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Event created Successfully",
            data: createdEvent
        },{status: 200})

        
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: error.message
        },{status:500})
        
    }
}
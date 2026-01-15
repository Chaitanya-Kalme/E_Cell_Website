import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest, { params }: { params: { participationId: string } }) {
    try {
        const urlParams = await params
        const participationId = urlParams.participationId

        if (!participationId) {
            return NextResponse.json({
                success: false,
                message: "Participation Id is required"
            }, { status: 400 })
        }

        const participation = await prisma.participant.findFirst({
            where: {
                id: participationId
            },
            include: {
                EventParticipated: true,
                participants: true
            }
        })

        const encodedString = jwt.sign(
            {
                participationId: participation?.id,
                TeamName: participation?.TeamName,
                EventName: participation?.EventParticipated.eventName,
                participants: participation?.participants,
                feesPaid: participation?.feesPaid
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1h'
            }
        )

        return NextResponse.json({
            success: true,
            message: "QR code generated successfully",
            data: encodedString
        },{status: 200})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message || "Error while generating QR Code. "
        }, { status: 500 })

    }
}
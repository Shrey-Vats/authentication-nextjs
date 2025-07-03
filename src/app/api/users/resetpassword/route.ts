import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if(!user){
            return NextResponse.json({
                message: `Invalid token,`,
                success: false
            }, {status: 400})
        }

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "User create successfuly",
            success: true
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: `Ser issue try again, ${error}`,
            success: false
        }, {status: 500})
    }
}
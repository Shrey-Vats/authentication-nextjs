import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

Connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                message: "Invalid email, email does not exit",
                success: "false"
            }, {status: 400})
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Email sended successfuly !",
            success: true
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: "Server issue try again",
            success: false
        }, {status: 500})
    }
}
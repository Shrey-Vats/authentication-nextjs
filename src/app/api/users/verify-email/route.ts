import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function GET(request: NextRequest) {
    try {
        const userId = request.cookies.get("id")?.value || "";

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }
        if (!user.isVerified) {
            return NextResponse.json({
                message: "User not verified yet",
                success: false
            }, { status: 400 });
        }
        return NextResponse.json({
            message: "User is verified",
            success: true,
        }, { status: 200})
        
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 });
    }
}
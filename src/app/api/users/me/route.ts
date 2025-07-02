import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({userId}).select("-password")
        return NextResponse.json({
            message: `User found`,
            data: user,
        },{status: 200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: `Failed to retrieve user`,
        })
    }
}
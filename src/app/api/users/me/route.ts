import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { Connect } from "@/dbConfig/dbConfig";

Connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        console.log("User ID:", userId);

        const user = await User.findOne({_id: userId}).select("-password")
        console.log("User Data:", user);
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
import { NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbConfig";

Connect();

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        }, {status: 200})

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set the cookie to expire immediately
        });

        return response;

    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status:500})
    }
}
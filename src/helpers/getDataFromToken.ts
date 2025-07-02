import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {
        const token:any =request.cookies.get("token")?.value || false
        const decordedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decordedToken.id;

    } catch (error) {
        console.error("Token error:", error);
        throw new Error("Failed to retrieve token from request cookies");
    }
}
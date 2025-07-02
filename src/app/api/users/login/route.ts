import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/authSchemas";
import jwt from "jsonwebtoken"

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        const result = loginSchema.safeParse(reqBody);

        if(!result.success) {
            return NextResponse.json({error: result.error.errors[0].message}, {status:400})
        }

        const user = await User.findOne({email: email.trim().toLowerCase()})

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const token = jwt.sign(
            {
              id: user._id.toString(), 
              email: user.email,
            },
            process.env.TOKEN_SECRET!,
          );          

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, {status: 200})

       response.cookies.set("token", token, {
            httpOnly: true,
        })

    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status:500})
    }
}
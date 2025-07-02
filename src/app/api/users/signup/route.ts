import {Connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import {z} from 'zod'
import { signUpSchema } from '@/lib/validations/authSchemas'

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {name, email, password} = reqBody;

        const result = signUpSchema.safeParse(reqBody);

        if (!result.success) {
            return NextResponse.json({error: result.error.errors[0].message}, {status: 400})
        }

        const user = await User.findOne({email: email.trim().toLowerCase()})

        if(user){
            return NextResponse.json({error: "User already exits with this email"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser: savedUser,
        }, {status: 201})

    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}
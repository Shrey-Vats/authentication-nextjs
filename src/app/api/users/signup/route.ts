import {Connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {name, email, password} = reqBody;
        
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}
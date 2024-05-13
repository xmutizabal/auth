import { NextResponse } from "next/server";
import User from '@/models/user'
import { connectDB } from "@/libs/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(request: Request){

    const {fullname, email, password} = await request.json()
    console.log(fullname, email, password)
    if(!password || password.length<6) return NextResponse.json({
        message: "El password debe tener al menos 6 caracteres"},{
            status: 400
        }
   )

 try {
    await connectDB()
    const userFound = await User.findOne({email})
 
    if (userFound) return NextResponse.json({
     message: "El correo ya existe"
    },{
     status:409
    })
 
     const hashedPassword = await bcrypt.hash(password,12)
     const user = new User({
         email,
         fullname,
         password: hashedPassword
     })
     const savedUser = await user.save()
     console.log(savedUser)
 
 
     return NextResponse.json(savedUser)
 } catch (error) {
    console.log(error)
    return NextResponse.error()
 }
}
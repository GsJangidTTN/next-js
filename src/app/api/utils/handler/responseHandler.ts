import { NextResponse } from "next/server";
export default function Handler(response:{ [key:string]: any}, statusInfo:any = { status: 200}){
    return NextResponse.json(response, statusInfo)
}
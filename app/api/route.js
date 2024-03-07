import { NextResponse } from "next/server"

export async function GET(request){
    console.log(request.body)
    return NextResponse.json({
        text:"hello"
    });
}
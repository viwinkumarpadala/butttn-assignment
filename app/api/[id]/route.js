// import fs from 'fs';
// import path from 'path';
import { NextResponse } from "next/server";
// import { GetFormContentByUrl } from "@/actions/form";


export async function GET(request) {
    try {
        // Extract the id from the request URL pathname
        const url = new URL(request.url);
        const pathname = url.pathname;
        const id = pathname.split('/').pop(); 
        console.log(id)

        if (!id) {
            throw new Error('ID parameter is missing');
        }
       

        const iframeCode = `
            <iframe src="https://butttn-assignment.vercel.app/submit/${id}" width="100%" height="100%" frameBorder = '0' scrolling = 'no'></iframe>
        `;

        // Return the script content as response with appropriate content type
        return new Response(iframeCode, {
            status: 200,
            headers: {
                'Content-Type': 'application/javascript',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}

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
            
            var iframe = document.createElement('iframe');
            
            
            iframe.src = 'https://butttn-assignment.vercel.app/submit/${id}';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.scrolling = 'no';

            
            document.body.appendChild(iframe);
            
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

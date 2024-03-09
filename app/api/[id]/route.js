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
    iframe.src = 'https://butttn-assignment.vercel.app/submit2/${id}';
    iframe.style.width = '500px';
    iframe.style.height = '700px'; 
    iframe.frameBorder = '0';
    iframe.style.overflow = 'hidden'; 
    
    function adjustIframeHeight() {
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        var iframeContentHeight = Math.min(
            iframeDocument.body.scrollHeight, 
            iframeDocument.documentElement.scrollHeight
        );
        iframe.style.height = iframeContentHeight + 'px';
    }

    
    iframe.onload = function() {
        adjustIframeHeight();
        iframe.contentWindow.addEventListener('resize', adjustIframeHeight);
        iframe.contentWindow.addEventListener('DOMContentLoaded', adjustIframeHeight);
    };
    
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



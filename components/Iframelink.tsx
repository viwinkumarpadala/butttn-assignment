"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

function Iframelink({ formURL }: { formURL: string }) {
  const [mounted, setMounted] = useState(false);

  const generatescript=`<iframe src="https://butttn-assignment.vercel.app/submit/${formURL}" width="100%" height="100%" frameBorder = '0' scrolling = 'no'></iframe>`

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }


  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={generatescript} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(generatescript);
          toast({
            title: "Copied!",
            description: "Iframe script copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Copy Iframe Code!
      </Button>
    </div>
  );
}

export default Iframelink;

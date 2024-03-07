"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

function Addscripts({ formURL }: { formURL: string }) {
  const [mounted, setMounted] = useState(false);

  const generatescript=`<script> src = "https://butttn-assignment.vercel.app/api/${formURL}";
</script>`

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
            description: "Script copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Copy Scripts!
      </Button>
    </div>
  );
}

export default Addscripts;

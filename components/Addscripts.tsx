"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

function Addscripts({ formURL }: { formURL: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  // const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  const generateScript = `<script src="https://butttn-assignment.vercel.app/api/${formURL}"></script>`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={generateScript} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(formURL);
          toast({
            title: "Copied!",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Copy scripts!
      </Button>
    </div>
  );
}

export default Addscripts;

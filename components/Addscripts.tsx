"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";
// import FormSubmitComponent from "./FormSubmitComponent";
import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";

function Addscripts({ formURL }: { formURL: string }) {
  const [mounted, setMounted] = useState(false);
  const [formContent, setFormContent] = useState<FormElementInstance[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormContent = async () => {
      try {
        const form = await GetFormContentByUrl(formURL);
        if (!form) {
          throw new Error("Form not found");
        }
        const parsedFormContent = JSON.parse(form.content) as FormElementInstance[];
        setFormContent(parsedFormContent);
        setMounted(true);
      } catch (error) {
        setErrorMessage((error as Error).message || "Error fetching form content");
      }
    };

    fetchFormContent();
  }, [formURL]);

  useEffect(() => {
    if (!mounted || !formContent) return;

    const generateScript = `<script src="https://butttn-assignment.vercel.app/api/${formURL}"></script>`;
    const handleCopyScript = () => {
      navigator.clipboard.writeText(generateScript);
      toast({
        title: "Copied!",
        description: "Script copied to clipboard",
      });
    };

    // Perform any additional logic here if needed

  }, [mounted, formContent, formURL]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!mounted || !formContent) {
    return null;
  }

  return (
    <div className="flex flex-grow gap-4 items-center">
      {/* <FormSubmitComponent formUrl={formURL} content={formContent} /> */}
      <Input value={`<script src="https://butttn-assignment.vercel.app/api/${formURL}"></script>`} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          // Call the copy script function here
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Copy Scripts!
      </Button>
    </div>
  );
}

export default Addscripts;

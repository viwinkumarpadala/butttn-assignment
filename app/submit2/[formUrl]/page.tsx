import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent2 from "@/components/FormSubmitComponent2";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];
  console.log('script loaded')

  return <FormSubmitComponent2 formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;

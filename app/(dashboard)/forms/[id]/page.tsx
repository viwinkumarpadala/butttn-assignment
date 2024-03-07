import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import GenerateBootstrapForm from "@/components/GenerateBootstrapForm";
import VisitBtn from "@/components/VisitBtn";
import React, { ReactNode } from "react";
import { StatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Addscripts from "@/components/Addscripts";
import Iframelink from "@/components/Iframelink";


interface Field {
    // Define the properties of the field here
  id: string;
  type: string;
  extraAttributes: {
    label: string;
    helperText: string;
    placeHolder: string;
    required: boolean;
    title: string,
    text: string,
    height:number,
    rows:number
  };
}

async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  // console.log(form)
  // console.log(form?.content)
  let formFields;
  if(form){
    formFields=JSON.parse(form.content)
  }
  // console.log(formFields)
  
  let formHTML ='<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">'
  formHTML+=`<style>
        .rate {
            float: left;
            height: 46px;
            padding: 0 10px;
        }
        .rate:not(:checked) > input {
            position: absolute;
            top: -9999px;
        }
        .rate:not(:checked) > label {
            float: right;
            width: 1em;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            font-size: 30px;
            color: #ccc;
        }
        .rate:not(:checked) > label:before {
            content: '★ ';
        }
        .rate > input:checked ~ label {
            color: #ffc700;
        }
        .rate:not(:checked) > label:hover,
        .rate:not(:checked) > label:hover ~ label {
            color: #deb217;
        }
        .rate > input:checked + label:hover,
        .rate > input:checked + label:hover ~ label,
        .rate > input:checked ~ label:hover,
        .rate > input:checked ~ label:hover ~ label,
        .rate > label:hover ~ input:checked ~ label {
            color: #c59b08;
        }
    </style>`
  formHTML+= '<br></br><br></br><div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6"><form class="max-w-lg mx-auto">';
  
formFields.forEach((field: Field) => {
    switch (field.type) {
        case 'TitleField':
            formHTML += `<br></br><h3 class="text-xl font-bold">${form?.name}</h3>`;
            break;
        case 'SubTitleField':
            formHTML += `<br></br><h4 class="text-lg font-semibold">${field.extraAttributes.title}</h4>`;
            break;
        case 'ParagraphField':
            formHTML += `<br></br><p class="text-gray-700">${field.extraAttributes.text}</p>`;
            break;
        case 'SeparatorField':
            formHTML += '<hr class="my-4 border-t border-gray-200">';
            break;
        case 'SpacerField':
            formHTML += `<div class="h-${field.extraAttributes.height}"></div>`;
            break;
        case 'NumberField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <input type="number" class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="${field.extraAttributes.placeHolder}" ${field.extraAttributes.required ? 'required' : ''}>
                        </div>`;
            break;
        case 'TextAreaField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <textarea class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="${field.extraAttributes.placeHolder}" rows="${field.extraAttributes.rows}" ${field.extraAttributes.required ? 'required' : ''}></textarea>
                        </div>`;
            break;
        case 'DateField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <input type="date" class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ${field.extraAttributes.required ? 'required' : ''}>
                        </div>`;
            break;
        case 'TimeField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <input type="time" class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="${field.extraAttributes.placeHolder}" ${field.extraAttributes.required ? 'required' : ''}>
                        </div>`;
            break;
        case 'CheckboxField':
            formHTML += `<br></br><div class="form-check">
                            <input type="checkbox" class="form-check-input rounded-md text-indigo-600 focus:ring-indigo-500" id="checkbox-${field.id}" ${field.extraAttributes.required ? 'required' : ''}>
                            <label class="form-check-label text-sm font-medium text-gray-700" for="checkbox-${field.id}">${field.extraAttributes.label}</label>
                        </div>`;
            break;
        case 'TextField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <input type="text" class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="${field.extraAttributes.placeHolder}" ${field.extraAttributes.required ? 'required' : ''}>
                        </div>`;
            break;
        case 'SelectField':
            formHTML += `<br></br><br></br><div class="form-group">
                            <label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
                            <select class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" ${field.extraAttributes.required ? 'required' : ''}>
                                <option value="">${field.extraAttributes.placeHolder}</option>
                                <!-- Add other options dynamically -->
                            </select>
                        </div>`;
            break;
        case 'StarField':
           formHTML+=` <br></br><label class="block text-sm font-medium text-gray-700">${field.extraAttributes.label}</label>
           <div class="rate">
    <input type="radio" id="star5" name="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div>
    `
    }
});
formHTML += `<br></br><br></br>
    <div class="flex justify-center">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">Submit</button>
    </div>
`;
formHTML += '<br></br><br></br></form></div><br></br><br></br><br></br>';


  // console.log(formHTML);

  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;


  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">Share Form: </h1>
        </div>
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">Copy HTML code: </h1>
        </div>
        <div className="container flex gap-2 items-center justify-between">
          <GenerateBootstrapForm formCode={formHTML} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">Embed form using script: </h1>
        </div>
        <div className="container flex gap-2 items-center justify-between">
          <Addscripts formURL={form.shareURL}></Addscripts>
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">Embed form using Iframe: </h1>
        </div>
        <div className="container flex gap-2 items-center justify-between">
          <Iframelink formURL={form.shareURL}></Iframelink>
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 container">
        <StatsCard
          title="Total visits"
          icon={<LuView className="text-cyan-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-purple-600"
        />

        <StatsCard
          title="Total form submissions"
          icon={<FaWpforms className="text-cyan-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-purple-600"
        />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "TimeField":
      case "NumberField":
      case "StarField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">Submitted Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell key={column.id} type={column.type} value={row[column.id]} />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
}

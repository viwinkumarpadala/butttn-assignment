// DynamicFormLoader.js

import React from 'react';
import { createRoot } from 'react-dom';
import { GetFormContentByUrl } from '@/actions/form';
// import { FormElementInstance } from '@/components/FormElements';
import FormSubmitComponent from '@/components/FormSubmitComponent';

async function loadFormAndRender(formUrl, containerId) {
    const form = await GetFormContentByUrl(formUrl);

    if (!form) {
        throw new Error('Form not found');
    }

    const formContent = JSON.parse(form.content);
    const root = createRoot(document.getElementById(containerId));
    root.render(
        <FormSubmitComponent formUrl={formUrl} content={formContent} />
    );
}

window.loadFormAndRender = loadFormAndRender;

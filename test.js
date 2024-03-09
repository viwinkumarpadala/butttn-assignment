// Assuming you're working in a Node.js environment
const axios = require("axios");
const cheerio = require("cheerio");

// Fetch the website content
axios
    .get("https://butttn-assignment.vercel.app/submit/d28221fe-d804-4dcc-9607-a64053d9f34f")
    .then((response) => {
        const htmlContent = response.data;

        // Load the HTML content into cheerio
        const $ = cheerio.load(htmlContent);

        // Find elements with the class name ".rounded"
        const roundedElements = $(".rounded");

        // Get the inner HTML of each .rounded element
        const roundedHTML = [];
        roundedElements.each((index, element) => {
            roundedHTML.push($.html(element));
        });

        // Now you have the HTML code of the .rounded elements
        console.log(roundedHTML.join("\n"));
    })
    .catch((error) => {
        console.error("Error fetching or parsing the website content:", error);
    });

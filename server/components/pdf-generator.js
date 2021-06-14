import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import getTemplateHtml from './get-template-html.js';

const generatePdf = async (data, template) => {
    const pdfFileName = data.order.id +'-'+ data.order.customerEmail + '.pdf'; 
    getTemplateHtml('invoices/' + template)
        .then(async (res) => {
            // Now we have the html code of our template in res object
            // you can check by logging it on console
            // !console.log("Compiling the template with handlebars");
            const template = handlebars.compile(res, { strict: true });
            // we have compile our code with handlebars
            const result = template(data);
            // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
            const html = result;

            // we are using headless mode 
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // We set the page content as the generated html by handlebars
            await page.setContent(html);
            // we Use pdf function to generate the pdf in the same folder as this file.
            await page.pdf({
                path: './downloads/'+ pdfFileName,
                printBackground: true,
                margin: {
                    left: '2cm',
                    top: '2cm',
                    right: '2cm',
                    bottom: '2.5cm'
                }
            });

            await browser.close();
            console.log("PDF Generated")
        })
        .catch(err => {
            console.error(err)
        })

    return pdfFileName;
}
export default generatePdf;
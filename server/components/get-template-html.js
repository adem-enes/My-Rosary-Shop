import fs from 'fs';
import path from 'path';

const getTemplateHtml = async (template) => {
    // console.log("Loading template file in memory")
    try {
        const templatePath = path.resolve("./templates/" + template + ".html");
        return await fs.readFileSync(templatePath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}

export default getTemplateHtml;
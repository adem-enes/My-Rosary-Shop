import mail from '../config/mail.js';
import mailer from 'nodemailer';
import handlebars from 'handlebars';
import getTemplateHtml from './get-template-html.js';

const transport = {
    pool: mail.POOL,
    host: mail.HOST,
    port: mail.PORT,
    secure: mail.SECURE,
    auth: {
        user: mail.MAIL,
        pass: mail.PASS
    }
}
const transporter = mailer.createTransport(transport);
transporter.verify((error, success) => {
    if (error) console.log(error.errno + ' ' + error.code + ' ' + error.message);
    else console.log('Server is ready to take message');
});

const getEmailData = async (to, subject, template) => {
    const emailTemplate = await getTemplateHtml('emails/' + template)
        .then((res) => {
            const template = handlebars.compile(res);
            return template(to);
        });
    return {
        from: mail.NAME + '<' + mail.MAIL + '>',
        to: to.customerName + ' ' + to.customerLastName + '<' + to.customerEmail + '>',
        subject: subject,
        html: emailTemplate
    }
}

const getEmailDataWithAtt = async (to, subject, template, attachmentFile) => {
    const emailTemplate = await getTemplateHtml('emails/' + template)
        .then((res) => {
            const template = handlebars.compile(res);
            return template(to);
        });
    return {
        from: mail.NAME + '<' + mail.MAIL + '>',
        to: to.customerName + ' ' + to.customerLastName + '<' + to.customerEmail + '>',
        subject: subject,
        html: emailTemplate,
        attachments: [
            {
                path: './downloads/' + attachmentFile
            }
        ]
    }
}

const sendMail = async (to, subject, template, attachmentFile = null) => {
    //TODO Configure the information like what should pass here, like the template, the customer mail,
    //TODO      the order pdf.
    //TODO Also what is subject

    const mailData = attachmentFile ? await getEmailDataWithAtt(to, subject, template, attachmentFile)
        : await getEmailData(to, subject, template);

    transporter.sendMail(mailData, (err, data) => {
        console.log('Email Sent');
        if (err) { console.log(err); return { status: 'fail', data } }
        else return { status: 'success', data };
    });
}

export default sendMail;
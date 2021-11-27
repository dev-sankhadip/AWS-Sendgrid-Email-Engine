const fs = require('fs');
const hbar = require('handlebars');
const config = require('../env/envVariable');
const TemplateConfigurationDetails = require('../env/templateConfiguration');

const templateParamDefination = (templateId, data,) => {

    let htmlData = fs.readFileSync(__dirname + config.templatePath + TemplateConfigurationDetails[templateId].path, "UTF-8");

    if (data) {
        let template = hbar.compile(htmlData);
        htmlData = template(data);
    }

    return htmlData;
}


const SESParam = (email, templateDetails, htmldata) => {
    return {
        Destination: {
            CcAddresses: [],
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmldata,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: templateDetails.subject,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: templateDetails.subject,
            },
        },
        Source: config.SenderEmailId,
        ReplyToAddresses: [],
    };
};

const SendgridParam = (email, templateDetails, htmldata) => {
    return [
        {
            to: email,
            from: config.SenderEmailId,
            subject: `${templateDetails.subject}`,
            html: `${htmldata}`,
        }
    ];
}


module.exports = {
    templateParamDefination,
    SESParam,
    SendgridParam
}
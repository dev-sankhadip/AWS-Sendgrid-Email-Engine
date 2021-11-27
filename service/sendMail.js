const { templateParamDefination, SESParam, SendgridParam } = require('../lib/templateProcessor');
const { ses } = require('../lib/aws');
const { sgMail } = require('../lib/sendgrid');
const TemplateConfigurationDetails = require('../env/templateConfiguration');


const SendSESMail = (req, res) => {
    const { templateId, email, data } = req.body;

    let htmlData = templateParamDefination(templateId, data);
    let params = SESParam(email, TemplateConfigurationDetails[templateId], htmlData);

    let sendEmail = ses.sendEmail(params).promise();

    sendEmail.then((data) => {
        return res.status(200).send(data);
    })
        .catch((err) => {
            return res.status(500).send(err);
        });
}


const SendSendgridMail = (req, res) => {
    const { templateId, email, data } = req.body;

    let htmlData = templateParamDefination(templateId, data);
    let params = SendgridParam(email, TemplateConfigurationDetails[templateId], htmlData);

    sgMail.send(params)
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err.response.body);
            return res.status(500).send(err);
        })
}


module.exports = {
    SendSESMail,
    SendSendgridMail
}
const fs = require('fs');
const path = require('path');
const { ses } = require('../lib/aws');
const Template_Details = require('../env/templateConfiguration');
const config = require('../env/envVariable');


const CreateTemplate = (req, res) => {
    try {
        const { templateId } = req.body;
        const { path: Path, subject } = Template_Details[templateId];

        let htmlData = fs.readFileSync(path.join(__dirname + config.templatePath + Path), { encoding: "utf-8" });

        var params = {
            Template: {
                TemplateName: templateId,
                HtmlPart: htmlData,
                SubjectPart: subject,
                TextPart: htmlData
            }
        };
        ses.createTemplate(params, function (err, data) {
            if (err) throw err;
            else return res.status(200).send(data);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

const DeleteTemplate = (req, res) => {
    try {
        const { templateId } = req.query;
        var params = {
            TemplateName: templateId
        };
        ses.deleteTemplate(params, function (err, data) {
            if (err) throw err;
            else return res.status(200).send(data);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

const SendDynamicMail = (req, res) => {

    try {
        const { templateId, email, data } = req.body;
        var params = {
            Destination: {
                ToAddresses: [
                    email
                ]
            },
            Source: config.aws_Credentials.SenderEmailId,
            Template: templateId,
            TemplateData: JSON.stringify(data),
            Tags: [
                {
                    Name: 'TAG',
                    Value: 'TAG'
                }
            ],
        };
        ses.sendTemplatedEmail(params, function (err, data) {
            if (err) return reject(err)
            else return resolve(data);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}


module.exports = {
    CreateTemplate,
    DeleteTemplate,
    SendDynamicMail
}
const express = require('express');
const mailRouter = express();


const { SendSESMail, SendSendgridMail } = require('../service/sendMail');
const { CreateTemplate, DeleteTemplate, SendDynamicMail } = require('../service/sendTemplatedMail');


mailRouter.post('/users/sendmail', SendSendgridMail);
mailRouter.post('/create-template', CreateTemplate);
mailRouter.delete('/delete-template', DeleteTemplate);
mailRouter.post('/send-dynamic-mail', SendDynamicMail);


module.exports = mailRouter;
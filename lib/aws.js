const AWS = require('aws-sdk');
const config = require('../env/envVariable');

AWS.config.update({
    region: config.aws_Credentials.region
})

let ses = new AWS.SES({
    accessKeyId: config.aws_Credentials.ACCESS_KEY,
    secretAccessKey: config.aws_Credentials.SECRET_KEY,
    apiVersion: "2010-12-01"
})

module.exports = {
    ses
}
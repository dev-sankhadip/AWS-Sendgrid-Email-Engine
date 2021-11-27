const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3001,
    SenderEmailId: process.env.AWS_SENDER_MAIL_ID,
    AdminMailId: process.env.ADMIN_MAIL_ID,
    aws_Credentials: {
        region: process.env.AWS_REGION,
        ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
        SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY
    },
    sendGrid_Credentials: {
        ACCESS_KEY: process.env.SENDGRID_API_KEY
    },

    corsOptions: {
        origin:
            process.env.ENVIORONMENT == "dev"
                ? "http://localhost:3000"
                : process.env.APPLICATION_URL,
        optionsSuccessStatus: 200,
        methods: "HEAD,PATCH,POST",
    },
    templatePath: "/../template/"
}
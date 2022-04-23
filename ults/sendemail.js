const nodemailer= require('nodemailer')
const sendEmail = (options) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "noorwebh@gmail.com",
            pass: "12345678@.",
        }
    });
    let mailoption={
        from:"noorwebh@gmail.com",
        to:options.to,
        subject:options.subject,
        text:options.text,
    }
    transporter.sendMail(mailoption,(err,data)=>{
        if(err)throw err;
    })
}
module.exports =sendEmail;
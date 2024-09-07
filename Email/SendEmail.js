var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
// const { Logs } = require('../controllers/common.controller');
const path = require('path');
const smtpTransport = require("nodemailer-smtp-transport");

var SendEmail = {

    SendHtmlEmail: async function (from, pass, toooo, template, subjects, args, bcc='') {

        try {


            var transporter = nodemailer.createTransport(smtpTransport({
                host: process.env.Email_host,
                port: process.env.Email_port,
                secure: false,
                auth: {
                    user: from,
                    pass: pass
                },
                tls: {
                    rejectUnauthorized: false
                },
                debug: true
            }));

            ejs.renderFile(basePath + "/views/EmailHtml/" + template, args, function (err, datas) {

                if (err) {
                    console.log(err);
                } else {
                    let mailOptions = {
                        // from: process.env.Email_user,
                        from: from, // sender address
                        to: toooo, // list of receivers
                        subject: subjects, // Subject line
                        html: datas, // html body
                        bcc: bcc
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(">>>>>>>> error ", error)
                        } else {
                            console.log(">>>>>>>> info ", info)
                        }
                    });
                }

            });

        } catch (ex) {
            console.log(">>>>>>>>", ex)
        }
    },
    SendHtmlEmailWithAttach: async function (from, pass, toooo, template, subjects, args, filePath) {

        try {

            var transporter = nodemailer.createTransport(smtpTransport({
                host: process.env.Email_host,
                port: process.env.Email_port,
                secure: true,
                auth: {
                    // user: process.env.Email_user,
                    // pass: process.env.Email_pass
                    user: from,
                    pass: pass
                },
                tls: {
                    rejectUnauthorized: false
                },
                debug: true
            }));

            ejs.renderFile(basePath + "/views/EmailHtml/" + template, args, function (err, datas) {

                if (err) {
                    console.log(err);
                } else {
                    var mailOptions = {
                        // from: process.env.Email_user,
                        from: from,
                        to: toooo,
                        subject: subjects,
                        html: datas,
                        attachments: [
                            {
                                path: filePath
                            }
                        ]
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(">>>>>>>> error ", error)
                        } else {
                            console.log(">>>>>>>> info ", info)
                        }
                    });
                }

            });

        } catch (ex) {
            console.log(">>>>>>>>", ex)
        }
    },
}

module.exports = SendEmail
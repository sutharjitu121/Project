const Common = require('../../model/common');
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
const randomstring = require("randomstring");
var fileExtension = require('file-extension');
const SendMail = require('../../Email/SendEmail');


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var auth = {

    sessionChecker: async function (req, res, next) {
        var ComDetail = await Common.selectWhere('setting', 'id=1');
        if ((req.session.user && req.session.email && req.session.pass)) {
            next();
        } else {
            res.render('admin/sign-in', {
                ComDetail: ComDetail[0],
                SuccessMsg: req.flash('signinSuccessMsg'),
                ErrorMsg: req.flash('signinErrorMsg'),
            });
        }
    },
    login: async function (req, res, next) {
        try {
            const ValidationCheck = new Validator(req.body, {
                username: 'required',
                password: 'required'
            });
            var FormaValidationError = await ValidationCheck.check();
            if (!FormaValidationError) {
                var errorStr = '';
                var error = ValidationCheck.errors;
                var len = Object.keys(error).length;
                var count = 0;
                for (var key in error) {
                    count++;
                    errorStr += error[key].message
                    if(count != len){
                        errorStr += ", ";
                    }
                }
                req.flash('signinErrorMsg', errorStr);
                return res.redirect('/admin/login');
            }
            var data = await Common.selectWhere('users', 'RoleID =1 AND EmailID = "' + req.body.username.trim() + '"');
            console.log(data.length)
            if (!data.length) {
                req.flash('signinErrorMsg', 'Email invalid');
                return res.redirect('/admin/login');
            }
            if (!data[0].status) {
                req.flash('signinErrorMsg', 'Your account is not active');
                return res.redirect('/admin/login');
            }
            var checkPassword = await bcrypt.compare(req.body.password.trim(), data[0].password)
            if (checkPassword) {
                var ComDetail = await Common.selectWhere('setting', 'id=1');
                req.session.email = data[0].EmailID
                req.session.pass = data[0].password
                req.session.RoleID = data[0].RoleID
                req.session.user = data[0];
                req.session.ComDetail = ComDetail[0];
                //redirectURL = process.env.BASE_URL + "/admin/dashboard"
                res.redirect('/admin/dashboard');
            } else {
                req.flash('signinErrorMsg', 'Password is incorrect');
                return res.redirect('/admin/login');
            }
        } catch (ex) {
            // Logs.ErrorHandler(ex, res)
            console.log(ex)
        }
    },
    logout: async function (req, res) {
        try {
            // var DataObject = {
            //     'RememberMe': 0
            // }
            // await Common.update('users', 'UserID=' + req.session.users.UserID,DataObject)
            req.session.email = false
            req.session.pass = false
            req.session.RoleID = false
            req.session.user = false
            req.session.destroy();
            res.redirect('/admin');
        } catch (ex) {
            console.log(ex)
        }
    },
    sign_in_get: async function(req, res, next){
        var ComDetail = await Common.selectWhere('setting', 'id=1');
        res.render('admin/sign-in',{
            ComDetail: ComDetail[0],
            SuccessMsg: req.flash('signinSuccessMsg'),
            ErrorMsg: req.flash('signinErrorMsg'),
        });
    },
    // sign_in_post: async function(req, res, next){
    //     var ComDetail = await Common.selectWhere('setting', 'id=1');
    //     res.render('admin/sign-up',{
    //         ComDetail: ComDetail[0],
    //         SuccessMsg: req.flash('signupSuccessMsg'),
    //         ErrorMsg: req.flash('signupErrorMsg'),
    //     });
    // },
    forget_password_get: async function(req, res, next){
        var ComDetail = await Common.selectWhere('setting', 'id=1');
        res.render('admin/forgot-password',{
            ComDetail: ComDetail[0],
            SuccessMsg: req.flash('forget_passwordSuccessMsg'),
            ErrorMsg: req.flash('forget_passwordErrorMsg'),
        });
    },
    forget_password: async function(req, res, next){
        var ComDetail = await Common.selectWhere('setting', 'id=1');
        var Email = await Common.selectWhere('users', 'EmailID = "' + req.body.email +'"');
        if (Email.length > 0){
            if(Email[0].status == 1){
                var randomstringpass = makeid(70);
                var UpdateData = {
                    reset_token: randomstringpass,
                }
                await Common.update('users', `UserID =  ${Email[0].UserID}`, UpdateData)
    
                var ClientFNameLname = Email[0].Fname + " " + Email[0].Lname
    
                var linkurl = process.env.BASE_URL + "/admin/forgot-password/" + randomstringpass;
    
                var EmailDataClient = { 
                    year: (new Date().getFullYear()), 
                    Name: ClientFNameLname, 
                    linkurl: linkurl,
                    CompanyName: ComDetail[0].company_name,
                    CompanyLogo: ComDetail[0].company_logo,
                    Email: ComDetail[0].email,
                    MobileNo: ComDetail[0].whatsapp
                };
    
                var EmailSubjectForForgotPassword = `Hi, ${ClientFNameLname} reset your password.`
    
                var EmailFrom = process.env.Email_Admin_Register
                var EmailPass = process.env.Email_Admin_Register_Pass;
                SendMail.SendHtmlEmail(EmailFrom, EmailPass, Email[0].EmailID, "forgotpassword.ejs", EmailSubjectForForgotPassword, EmailDataClient);

                req.flash('forget_passwordSuccessMsg', 'Reset link is send to your Registered Email.');
                res.redirect("/admin/forgot-password")

            }else{
                req.flash('forget_passwordErrorMsg', 'User is blocked!');
                res.redirect("/admin/forgot-password")
            }
        }else{
            req.flash('forget_passwordErrorMsg', 'User Not Found!');
            res.redirect("/admin/forgot-password")
        }

    },
    reset_password: async function(req ,res ,next){
        var token = await common.selectWhere('users', 'reset_token = "' + req.params.key +'"');
        var ComDetail = await Common.selectWhere('setting', 'id=1');
        if(token.length > 0){
            res.render('admin/reset-password',{
                ComDetail: ComDetail[0],
                token: req.params.key,
                SuccessMsg: req.flash('reset_password_saveSuccessMsg'),
                ErrorMsg: req.flash('reset_password_saveErrorMsg'),
            }); 
        }else{
            res.render('admin/404')
        }

    },
    reset_password_save: async function(req ,res ,next){
        const ValidationCheck = new Validator(req.body, {
            confirm: 'required',
            password: 'required|same:confirm',
        });
        var FormaValidationError = await ValidationCheck.check();
        if (!FormaValidationError) {
            var errorStr = '';
            var error = ValidationCheck.errors;
            var len = Object.keys(error).length;
            var count = 0;
            for (var key in error) {
                count++;
                errorStr += error[key].message
                if(count != len){
                    errorStr += ", ";
                }
            }
            req.flash('reset_password_saveErrorMsg', errorStr);
            return res.redirect('/admin/forgot-password/'+req.body.token);
        }
        var dataobj = await common.selectWhere('users', 'reset_token = "' + req.body.token +'"');
        if(dataobj.length > 0){
            var pass = await bcrypt.hash(req.body.password, 10);
            var DataObject = {
                reset_token: null,
                password: pass
            };
            await Common.update('users', `UserID =  ${dataobj[0].UserID}`, DataObject)

            req.flash('signinSuccessMsg', "Your password reset successfully");
            return res.redirect('/admin/login/');
        }else{
            res.render('admin/500') 
        }
    },
    change_password: async function (req, res) {
        try {
            let breadcrumb = ['Change Password'];
            let page_title = 'Change Password';
            res.render('admin/auth/change-password', {
                breadcrumb: breadcrumb,
                control: 'auth',
                active: 'auth',
                page_title: page_title,
                user: req.session.user,
            });
        } catch (ex) {
            Logs.ErrorHandler(ex, res);
        }
    },
    ChangePassword: async function (req, res) {
        try {
            const ValidationCheck = new Validator(req.body, {
                OldPassword: 'required',
                Password: 'required',
                ConfirmPassword: 'required|same:Password',
            });
            var FormaValidationError = await ValidationCheck.check();
            if (!FormaValidationError) {
                return res.status(400).json({ status: false, message: "validation_error", data: ValidationCheck.errors });
            }
            data = await Common.selectWhere('users', 'UserID = ' + req.session.user.UserID);
            if (!data.length) {
                return res.status(200).json({ status: false, message: 'User Not Found', data: [] });
            }

            var checkPassword = await bcrypt.compare(req.body.OldPassword.trim(), data[0].Password)
            if (checkPassword) {
                var password = await bcrypt.hash(req.body.Password, 10)
                var UpdateData = {
                    Password: password
                }
                await Common.update('users', `UserID =  ${req.session.user.UserID}`, UpdateData)
                redirectURL = process.env.BASE_URL + "/admin/dashboard"
                return res.status(200).json({ status: true, message: 'Successfully Password Changed', data: [], redirect: redirectURL });
            } else {
                return res.status(200).json({ status: false, message: 'Old Password is incorrect', data: [] });
            }
        } catch (ex) {
            Logs.ErrorHandler(ex, res);
        }
    },
    change_delete_password: async function (req, res) {
        try {
            let breadcrumb = ['Change Delete Password'];
            let page_title = 'Change Delete Password';
            res.render('admin/auth/change-delete-password', {
                breadcrumb: breadcrumb,
                control: 'auth',
                active: 'auth',
                page_title: page_title,
                user: req.session.user,
            });
        } catch (ex) {
            Logs.ErrorHandler(ex, res);
        }
    },
    ChangeDeletePassword: async function (req, res) {
        try {
            const ValidationCheck = new Validator(req.body, {
                OldPassword: 'required',
                Password: 'required',
                ConfirmPassword: 'required|same:Password',
            });
            var FormaValidationError = await ValidationCheck.check();
            if (!FormaValidationError) {
                return res.status(400).json({ status: false, message: "validation_error", data: ValidationCheck.errors });
            }
            data = await Common.selectWhere('delete_password_setting', 'LoginID = ' + req.session.user.UserID);
            if (!data.length) {
                return res.status(200).json({ status: false, message: 'User Not Found', data: [] });
            }

            var checkPassword = await bcrypt.compare(req.body.OldPassword.trim(), data[0].Password)
            if (checkPassword) {
                var password = await bcrypt.hash(req.body.Password, 10)
                var UpdateData = {
                    Password: password,
                    LastChange: new Date()
                }
                await Common.update('delete_password_setting', `LoginID =  ${req.session.user.UserID}`, UpdateData)
                redirectURL = process.env.BASE_URL + "/admin/dashboard"
                return res.status(200).json({ status: true, message: 'Successfully Password Changed', data: [], redirect: redirectURL });
            } else {
                return res.status(200).json({ status: false, message: 'Old Password is incorrect', data: [] });
            }
        } catch (ex) {
            Logs.ErrorHandler(ex, res);
        }
    },
}
module.exports = auth;
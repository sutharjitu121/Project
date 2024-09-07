const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var setting = {
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM setting WHERE id=1`)    
        res.render('admin/setting/edit',{
            active:'setting',
            title:'Edit Setting',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('SettingSuccessMsg'),
            ErrorMsg: req.flash('SettingErrorMsg'),
        });
    },
    editSave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                title: 'required',
                email: 'required',
                facebook: 'required',
                instagram: 'required',
                twitter: 'required',
                WhatsApp:  'required',
                location:  'required',
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
                req.flash('SettingErrorMsg', errorStr);
                return res.redirect('/admin/setting');
            }

            let favicon_name = ''
            if (req.files != null && req.files.favicon != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.favicon.size <= 1000000) {
                    if (mime.includes(req.files.favicon.mimetype)) {
                        var imageFile = req.files.favicon;
                        var ext = fileExtension(imageFile.name);
                        favicon_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'setting/favicon/' + favicon_name, function () { });

                        //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            fileHelper.file_unlink_helper('setting', 'id', req.body.id, 'favicon', 'setting/favicon/')
                        }
                        //END OLD FILE REMOVE
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }
            let companylogo_name = ''
            if (req.files != null && req.files.company_logo != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.company_logo.size <= 1000000) {
                    if (mime.includes(req.files.company_logo.mimetype)) {
                        var imageFile = req.files.company_logo;
                        var ext = fileExtension(imageFile.name);
                        companylogo_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'setting/company_logo/' + companylogo_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('setting', 'id', req.body.id, 'company_logo', 'setting/company_logo/')
                        }
                        //END OLD FILE REMOVE
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }
            let hedear_bg_image = ''
            if (req.files != null && req.files.header_bg != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.header_bg.size <= 1000000) {
                    if (mime.includes(req.files.header_bg.mimetype)) {
                        var imageFile = req.files.header_bg;
                        var ext = fileExtension(imageFile.name);
                        hedear_bg_image = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'setting/header_bg/' + hedear_bg_image, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('setting', 'id', req.body.id, 'HeaderBg', 'setting/header_bg/')
                        }
                        //END OLD FILE REMOVE
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }
            let footer_bg_image = ''
            if (req.files != null && req.files.footer_bg != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.footer_bg.size <= 1000000) {
                    if (mime.includes(req.files.footer_bg.mimetype)) {
                        var imageFile = req.files.footer_bg;
                        var ext = fileExtension(imageFile.name);
                        footer_bg_image = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'setting/footer_bg/' + footer_bg_image, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('setting', 'id', req.body.id, 'FooterBg', 'setting/footer_bg/')
                        }
                        //END OLD FILE REMOVE
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }

            message = "Update Successfully";
            var DataObject = {
                'company_name': req.body.name,
                'company_title': req.body.title,
                'email': req.body.email,
                'facebook': req.body.facebook,
                'instagram': req.body.instagram,
                'twitter': req.body.twitter,
                'whatsapp': req.body.WhatsApp,
                'location': req.body.location,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (favicon_name) {
                DataObject.favicon = favicon_name;
            }
            if (companylogo_name) {
                DataObject.company_logo = companylogo_name;
            }
            if (hedear_bg_image) {
                DataObject.HeaderBg = hedear_bg_image;
            }
            if (footer_bg_image) {
                DataObject.FooterBg = footer_bg_image;
            }
            await Common.update('setting', `id =  ${req.body.id}`, DataObject)

            req.flash('SettingSuccessMsg', 'Setting Update successfully!');
            return res.redirect('/admin/setting');

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}

module.exports = setting;
const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var services = {
    index: async function(req, res, next){
        var DataObject = await Common.select('services');
        res.render('admin/services/list',{
            title:'Services',
            active:'services',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/services/add',{
            active:'services',
            title:'Add Service',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('ServiceSuccessMsg'),
            ErrorMsg: req.flash('ServiceErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                title: 'required',
                subtitle: 'required',
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
                req.flash('ServiceErrorMsg', errorStr);
                return res.redirect('/admin/services/add'); 
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'services/' + image_name, function () { });
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }

            message = "Added Successfully";
            var DataObject = {
                'title': req.body.title,
                'subtitle': req.body.subtitle,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            // if (req.body.UserID > 0) {
            //     message = "Updated Successfully";
            //     await Common.update('users', `UserID =  ${req.body.UserID}`, DataObject)
            //     UserID = req.body.UserID
            // } else {
            DataObject.created_by = req.session.user.UserID;
            DataObject.created_on = new Date();
            await Common.insert('services', DataObject)

            req.flash('ServiceSuccessMsg', 'Service Added successfully!');
            return res.redirect('/admin/services/add');
        } catch (ex) {
            console.log(ex);
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM services WHERE id=${req.params.id}`)    
        res.render('admin/services/edit',{
            active:'services',
            title:'Edit Services',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('ServiceSuccessMsg'),
            ErrorMsg: req.flash('ServiceErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                title: 'required',
                subtitle: 'required',
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
                req.flash('ServiceErrorMsg', errorStr);
                return res.redirect('/admin/services/edit/'+req.body.id);
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'services/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('services', 'id', req.body.id, 'image', 'services/')
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
                'title': req.body.title,
                'subtitle': req.body.subtitle,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            await Common.update('services', `id =  ${req.body.id}`, DataObject)

            req.flash('ServiceSuccessMsg', 'Service Update successfully!');
            return res.redirect('/admin/services/edit/'+req.body.id);

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM services WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Service deleted successfully!');
        return res.redirect('/admin/services/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('services', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'Service Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'Service Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('services', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/services/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    
}
module.exports = services;

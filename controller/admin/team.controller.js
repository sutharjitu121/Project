const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var team = {
    index: async function(req, res, next){
        var DataObject = await Common.select('team');
        res.render('admin/team/list',{
            title:'Team',
            active:'team',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/team/add',{
            active:'team',
            title:'Add Team',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('TeamSuccessMsg'),
            ErrorMsg: req.flash('TeamErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                position: 'required',
                description: 'required',
                facebook: 'required',
                instagram: 'required',
                twitter: 'required',
                WhatsApp:  'required',
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
                req.flash('TeamErrorMsg', errorStr);
                return res.redirect('/admin/team/add');
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'team/' + image_name, function () { });
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'The File size should be less then 1MB.' } } });
                }
            }else{
                return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'Image is required.' } } });
            }

            message = "Added Successfully";
            var DataObject = {
                'name': req.body.name,
                'position': req.body.position,
                'description': req.body.description,
                'facebook_link': req.body.facebook,
                'instagram': req.body.instagram,
                'twitter': req.body.twitter,
                'whatsapp': req.body.WhatsApp,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }

            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('team', DataObject)

            req.flash('TeamSuccessMsg', 'Team Member Added successfully!');
            return res.redirect('/admin/team/add'); 
            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM team WHERE id=${req.params.id}`)    
        res.render('admin/team/edit',{
            active:'team',
            title:'Edit Team',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('TeamSuccessMsg'),
            ErrorMsg: req.flash('TeamErrorMsg'),
        });
    },
    editSave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                position: 'required',
                description: 'required',
                facebook: 'required',
                instagram: 'required',
                twitter: 'required',
                WhatsApp:  'required',
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
                req.flash('TeamErrorMsg', errorStr);
                return res.redirect('/admin/team/edit/'+req.body.id);
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'team/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await awaitfileHelper.file_unlink_helper('team', 'id', req.body.id, 'image', 'team/')
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
                'name': req.body.name,
                'position': req.body.position,
                'description': req.body.description,
                'facebook_link': req.body.facebook,
                'instagram': req.body.instagram,
                'twitter': req.body.twitter,
                'whatsapp': req.body.WhatsApp,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            await Common.update('team', `id =  ${req.body.id}`, DataObject)

            req.flash('TeamSuccessMsg', 'Team Member Update successfully!');
            return res.redirect('/admin/team/edit/'+req.body.id);

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM team WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Team Member deleted successfully!');
        return res.redirect('/admin/team/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('team', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'Team Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = ' Team Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('team', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/team/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}

module.exports = team;
const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var user = {
    index: async function(req, res, next){
        var DataObject = await Common.CustomQuery('SELECT users.*,role.role_name AS rolename FROM users LEFT JOIN role ON role.id=users.RoleID');
        // var DataObject = await Common.select('users');
        res.render('admin/user/list',{
            title:'User',
            active:'user',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: async function(req, res, next){
        var rolelist = await Common.selectWhere('role',' status=1 ');
        res.render('admin/user/add',{
            active:'user',
            title:'Add User',
            roledata:rolelist,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('UserSuccessMsg'),
            ErrorMsg: req.flash('UserErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                roleid: 'required',
                fname: 'required',
                lname: 'required',
                emailid: 'required',
                mobilenumber: 'required',
                alternatemo:  'required',
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
                req.flash('UserErrorMsg', errorStr);
                return res.redirect('/admin/user/add');
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'user/' + image_name, function () { });
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'The File size should be less then 1MB.' } } });
                }
            }

            message = "Added Successfully";
            var DataObject = {
                'RoleID': req.body.roleid,
                'Fname': req.body.fname,
                'Lname': req.body.lname,
                'EmailID': req.body.emailid,
                'MobileNumber': req.body.mobilenumber,
                'AlternativetNo': req.body.alternatemo,
                'ModifiedBy': req.session.user.UserID,
                'ModifiedOn': new Date()
            }
            if (image_name) {
                DataObject.userprofile = image_name;
            }

            DataObject.CreatedBy = 1;
            DataObject.CreatedOn = new Date();
            await Common.insert('users', DataObject)

            req.flash('UserSuccessMsg', 'User Added successfully!');
            return res.redirect('/admin/user/add'); 
            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var rolelist = await Common.selectWhere('role',' status=1 ');
        var DataObj = await Common.CustomQuery(`SELECT * FROM users WHERE UserID=${req.params.id}`)    
        res.render('admin/user/edit',{
            active:'user',
            title:'Edit User',
            DataObj: DataObj[0],
            roledata: rolelist,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('UserSuccessMsg'),
            ErrorMsg: req.flash('UserErrorMsg'),
        });
    },
    editSave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                roleid: 'required',
                fname: 'required',
                lname: 'required',
                emailid: 'required',
                mobilenumber: 'required',
                alternatemo:  'required',
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
                req.flash('UserErrorMsg', errorStr);
                return res.redirect('/admin/user/edit/'+req.body.id);
            }
            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'user/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('users', 'UserID', req.body.id, 'userprofile', 'user/')
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
                'RoleID': req.body.roleid,
                'Fname': req.body.fname,
                'Lname': req.body.lname,
                'EmailID': req.body.emailid,
                'MobileNumber': req.body.mobilenumber,
                'AlternativetNo': req.body.alternatemo,
                'ModifiedBy': req.session.user.UserID,
                'ModifiedOn': new Date()
            }
            if (image_name) {
                DataObject.userprofile = image_name;
            }
            await Common.update('users', `UserID =  ${req.body.id}`, DataObject)

            req.flash('UserSuccessMsg', 'User Update successfully!');
            return res.redirect('/admin/user/edit/'+req.body.id);

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM users WHERE UserID=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'User deleted successfully!');
        return res.redirect('/admin/user/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('users', "UserID=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'User Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'User Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('users', 'UserID= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/user/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}

module.exports = user;
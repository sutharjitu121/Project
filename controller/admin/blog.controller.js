const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var blog = {
    index: async function(req, res, next){
        var DataObject = await Common.select('blog');
        res.render('admin/blog/list',{
            title:'blog',
            active:'blog',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/blog/add',{
            active:'blog',
            title:'Add Blog',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('BlogSuccessMsg'),
            ErrorMsg: req.flash('BlogErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                title: 'required',
                description: 'required',
                tag: 'required',
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
                req.flash('BlogErrorMsg', errorStr);
                return res.redirect('/admin/blog/add');
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'blog/' + image_name, function () { });
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
                'title': req.body.title,
                'description': req.body.description,
                'tags': req.body.tag,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }

            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('blog', DataObject)

            req.flash('BlogSuccessMsg', 'Blog Added successfully!');
            return res.redirect('/admin/blog/add'); 
            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM blog WHERE id=${req.params.id}`)    
        res.render('admin/blog/edit',{
            active:'blog',
            title:'Edit Blog',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('BlogSuccessMsg'),
            ErrorMsg: req.flash('BlogErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                title: 'required',
                description: 'required',
                tag: 'required',
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
                req.flash('BlogErrorMsg', errorStr);
                return res.redirect('/admin/blog/edit/'+req.body.id);
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'blog/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('blog', 'id', req.body.id, 'image', 'blog/')
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
                'description': req.body.description,
                'tags': req.body.tag,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            await Common.update('blog', `id =  ${req.body.id}`, DataObject)

            req.flash('BlogSuccessMsg', 'Blog Update successfully!');
            return res.redirect('/admin/blog/edit/'+req.body.id);

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await common.CustomQuery(`DELETE FROM blog WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Blog deleted successfully!');
        return res.redirect('/admin/blog/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('blog', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'Blog Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'Blog Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('blog', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/blog/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}
module.exports = blog;
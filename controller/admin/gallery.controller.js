const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var gallery = {
    index: async function(req, res, next){
        var DataObject = await Common.CustomQuery('SELECT gallery.*,gallery_category.name AS categoryName FROM gallery LEFT JOIN gallery_category ON gallery_category.id=gallery.category_id');
        res.render('admin/gallery/list',{
            title:'gallery',
            active:'gallery',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),

        });
    },
    add: async function(req, res, next){
        var DataObject = await Common.selectWhere('gallery_category',' status=1 ');
        res.render('admin/gallery/add',{
            active:'gallery',
            title:'Add Gallery',
            DataList:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('gallerySuccessMsg'),
            ErrorMsg: req.flash('galleryErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                categoryid: 'required',
                name: 'required',               
            });
            var FormaValidationError = await ValidationCheck.check();
            if (!FormaValidationError) {
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
                    req.flash('galleryErrorMsg', errorStr);
                    return res.redirect('/admin/gallery/add');
                }
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'gallery/' + image_name, function () { });
                    } else {
                        return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'Only JPG/JPEG/PNG format allowed.' } } });
                    }
                } else {
                    return res.status(400).json({ status: false, message: "validation_error", data: { ComLogo: { message: 'The File size should be less then 1MB.' } } });
                }
            }else{
                return res.status(400).json({ status: false, message: "validation_error", data: { Imagefile: { message: 'Image is required.' } } });    
            }

            message = "Added Successfully";
            var DataObject = {
                'category_id': req.body.categoryid,
                'name': req.body.name,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }

            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('gallery', DataObject)

            req.flash('gallerySuccessMsg', 'Gallery Added successfully!');
            return res.redirect('/admin/gallery/add'); 

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObject = await Common.selectWhere('gallery_category',' status=1 ');
        var DataObj = await Common.CustomQuery(`SELECT * FROM gallery WHERE id=${req.params.id}`)    
        res.render('admin/gallery/edit',{
            active:'gallery',
            title:'Edit',
            DataObj: DataObj[0],
            DataList: DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('gallerySuccessMsg'),
            ErrorMsg: req.flash('galleryErrorMsg'),
        });
    },
    editSave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                categoryid: 'required',
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
                req.flash('galleryErrorMsg', errorStr);
                return res.redirect('/admin/gallery/edit/'+req.body.id);
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'gallery/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('gallery', 'id', req.body.id, 'image', 'gallery/')
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
                'category_id': req.body.categoryid,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            await Common.update('gallery', `id =  ${req.body.id}`, DataObject)

            req.flash('gallerySuccessMsg', 'Gallery Update successfully!');
            return res.redirect('/admin/gallery/edit/'+req.body.id);
            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM gallery WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Gallery deleted successfully!');  
        return res.redirect('/admin/gallery/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('gallery', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'Gallery Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'Gallery Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('gallery', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/gallery/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}

module.exports = gallery;
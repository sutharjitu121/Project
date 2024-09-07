const Common = require('../../model/common');
const { Validator } = require('node-input-validator');
var fileExtension = require('file-extension');
const randomstring = require("randomstring");
var fileHelper = require('../../helper/helper');

var video = {
    index: async function(req, res, next){
        var DataObject = await Common.select('video');
        res.render('admin/video/list',{
            title:'video',
            active:'video',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM video WHERE id=${req.params.id}`)    
        console.log(DataObj)
        res.render('admin/video/edit',{
            active:'video',
            title:'Edit video',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('VideoSuccessMsg'),
            ErrorMsg: req.flash('VideoErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                title: 'required',
                subtitle: 'required',
                description: 'required',
                Video: 'required',
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
                req.flash('VideoErrorMsg', errorStr);
                return res.redirect('/admin/video/edit/'+req.body.id);
            }

            let image_name = ''
            if (req.files != null && req.files.Imagefile != undefined) {
                var mime = ['image/jpeg', 'image/png']
                if (req.files.Imagefile.size <= 1000000) {
                    if (mime.includes(req.files.Imagefile.mimetype)) {
                        var imageFile = req.files.Imagefile;
                        var ext = fileExtension(imageFile.name);
                        image_name = randomstring.generate() + '.' + ext;
                        imageFile.mv(uploadPath + 'video/' + image_name, function () { });

                        // //OLD FILE REMOVE
                        if (req.body.id > 0) {
                            await fileHelper.file_unlink_helper('video', 'id', req.body.id, 'image', 'video/')
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
                'description': req.body.description,
                'video_link': req.body.Video,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            if (image_name) {
                DataObject.image = image_name;
            }
            await Common.update('video', `id =  ${req.body.id}`, DataObject)

            req.flash('VideoSuccessMsg', 'Video Update successfully!');
            return res.redirect('/admin/video/edit/'+req.body.id);

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM video WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Video deleted successfully!');
        return res.redirect('/admin/video/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('video', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'video Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'video Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('video', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/video/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    
}
module.exports = video;

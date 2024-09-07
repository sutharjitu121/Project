const Common = require('../../model/common');
const { Validator } = require('node-input-validator');

var gallery_category = {
    index: async function(req, res, next){
        var DataObject = await Common.select('gallery_category');
        res.render('admin/gallery_category/list',{
            title:'gallery_category',
            active:'gallery_category',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/gallery_category/add',{
            active:'gallery_category',
            title:'Add Gallery',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('GallerySuccessMsg'),
            ErrorMsg: req.flash('GalleryErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
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
                req.flash('GalleryErrorMsg', errorStr);
                return res.redirect('/admin/gallery_category/add');
            }
            var showw = 0
            if(req.body.show == 'on'){
                showw = 1;
            }
            message = "Added Successfully";
            var DataObject = {
                'name': req.body.name,
                'is_show': showw,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('gallery_category', DataObject)
            
            req.flash('GallerySuccessMsg', 'Category Name Added successfully!');
            return res.redirect('/admin/gallery_category/add'); 

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM gallery_category WHERE id=${req.params.id}`)    
        res.render('admin/gallery_category/edit',{
            active:'gallery_category',
            title:'Edit',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('CategorySuccessMsg'),
            ErrorMsg: req.flash('CategoryErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
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
                req.flash('GalleryErrorMsg', errorStr);
                return res.redirect('/admin/gallery_category/edit/'+req.body.id);
            }
            var showw = 0
            if(req.body.show == 'on'){
                showw = 1;
            }
            message = "Update Successfully";
            var DataObject = {
                'name': req.body.name,
                'is_show': showw,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            await Common.update('gallery_category', `id =  ${req.body.id}`, DataObject)
            
            req.flash('CategorySuccessMsg', 'Category Update successfully!');
            return res.redirect('/admin/gallery_category/edit/'+req.body.id);

            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await common.CustomQuery(`DELETE FROM gallery_category WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Category deleted successfully!');
        return res.redirect('/admin/gallery_category/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('gallery_category', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'Category Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = ' Category Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('gallery_category', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/gallery_category/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    is_show: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('gallery_category', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].is_show == 1) {
                        msg = 'Category Blocked Successfully.';
                        var DataObject = {
                            'is_show': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].is_show == 0) {
                        msg = ' Category Activated Successfully.';
                        var DataObject = {
                            'is_show': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('gallery_category', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/gallery_category/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
}

module.exports = gallery_category;
const Common = require('../../model/common');
const { Validator } = require('node-input-validator');

var f_and_q = {
    index: async function(req, res, next){
        var DataObject = await Common.select('f_and_q');
        res.render('admin/f_and_q/list',{
            title:'Frequently Asked Questions',
            active:'f_and_q',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/f_and_q/add',{
            active:'f_and_q',
            title:'Frequently Asked Questions',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('FandQSuccessMsg'),
            ErrorMsg: req.flash('FandQErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                question: 'required',
                answer: 'required',
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
                req.flash('FandQErrorMsg', errorStr);
                return res.redirect('/admin/f_and_q/add');
            }

            message = "Added Successfully";
            var DataObject = {
                'question': req.body.question,
                'answer': req.body.answer,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('f_and_q', DataObject)
            
            req.flash('FandQSuccessMsg', 'FandQ Added successfully!');
            return res.redirect('/admin/f_and_q/add'); 

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM f_and_q WHERE id=${req.params.id}`)    
        res.render('admin/f_and_q/edit',{
            active:'f_and_q',
            title:'Frequently Asked Questions',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('FandQSuccessMsg'),
            ErrorMsg: req.flash('FandQErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                question: 'required',
                answer: 'required',
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
                req.flash('FandQErrorMsg', errorStr);
                return res.redirect('/admin/f_and_q/edit/'+req.body.id);
            }
            message = "Update Successfully";
            var DataObject = {
                'question': req.body.question,
                'answer': req.body.answer,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            await Common.update('f_and_q', `id =  ${req.body.id}`, DataObject)
            
            req.flash('FandQSuccessMsg', 'FandQ Update successfully!');
            return res.redirect('/admin/f_and_q/edit/'+req.body.id);

            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await common.CustomQuery(`DELETE FROM f_and_q WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'FandQ deleted successfully!');
        return res.redirect('/admin/f_and_q/');    
    },
    is_active: async function (req, res, next) {
        try {
            if (req.params.id) {
                UserData = await Common.selectWhere('f_and_q', "id=" + req.params.id)
                if (UserData[0]) {
                    var msg = '';
                    if (UserData[0].status == 1) {
                        msg = 'FandQ Blocked Successfully.';
                        var DataObject = {
                            'status': 0,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    } else if (UserData[0].status == 0) {
                        msg = 'FandQ Activated Successfully.';
                        var DataObject = {
                            'status': 1,
                            'modified_by': req.session.user.UserID,
                            'modified_on': new Date()
                        }
                    }
                    await Common.update('f_and_q', 'id= ' + req.params.id, DataObject)
                    req.flash('deletePostSuccessMsg', msg); 
                } else {
                    req.flash('deletePostErrorMsg', 'Something went wrong!');
                }
            }else{
                req.flash('deletePostErrorMsg', 'Something went wrong!');
            }

            return res.redirect('/admin/f_and_q/');
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },

}

module.exports = f_and_q;
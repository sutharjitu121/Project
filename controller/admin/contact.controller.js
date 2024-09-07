const Common = require('../../model/common');
const { Validator } = require('node-input-validator');

var contact = {
    index: async function(req, res, next){
        var DataObject = await Common.select('contact');
        res.render('admin/contact/list',{
            title:'Contact',
            active:'contact',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/contact/add',{
            active:'contact',
            title:'Add Contact',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('ContactSuccessMsg'),
            ErrorMsg: req.flash('ContactErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                email: 'required',
                mobile: 'required',
                subject: 'required',
                message: 'required',
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
                // req.flash('ContactErrorMsg', errorStr);
                return res.status(200).json({ status: false, message: errorStr });
            }

            message = "Added Successfully";
            var DataObject = {
                'name': req.body.name,
                'email': req.body.email,
                'mobile': req.body.mobile,
                'subject': req.body.subject,
                'message': req.body.message,
                'modified_by': req.session.user ? req.session.user.UserID : 0,
                'modified_on': new Date()
            }
            DataObject.created_by = req.session.user ? req.session.user.UserID : 0;
            DataObject.created_on = new Date();
            await Common.insert('contact', DataObject)
            
            req.flash('ContactSuccessMsg', 'Contact Added successfully!');
            // return res.redirect('../../views/home'); 
            return res.status(200).json({ status: true, message: 'Detail Added successfully!' });

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    edit: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`SELECT * FROM contact WHERE id=${req.params.id}`)    
        res.render('admin/contact/edit',{
            active:'contact',
            title:'Edit',
            DataObj: DataObj[0],
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('ContactSuccessMsg'),
            ErrorMsg: req.flash('ContactErrorMsg'),
        });
    },
    editsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                email: 'required',
                mobile: 'required',
                subject: 'required',
                message: 'required',
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
                req.flash('ContactErrorMsg', errorStr);
                return res.redirect('/admin/contact/edit/'+req.body.id);
            }
            message = "Update Successfully";
            var DataObject = {
                'name': req.body.name,
                'email': req.body.email,
                'mobile': req.body.mobile,
                'subject': req.body.subject,
                'message': req.body.message,
                'modified_by': req.session.user.UserID,
                'modified_on': new Date()
            }
            await Common.update('contact', `id =  ${req.body.id}`, DataObject)
            
            req.flash('ContactSuccessMsg', 'Contact Update successfully!');
            return res.redirect('/admin/contact/edit/'+req.body.id);

            
        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM contact WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'contact deleted successfully!');
        return res.redirect('/admin/contact/');    
    }
}
module.exports = contact;
const Common = require('../../model/common');
const { Validator } = require('node-input-validator');

var subscribeemail = {
    index: async function(req, res, next){
        var DataObject = await Common.select('subscribeemail');
        res.render('admin/subscribeemail/list',{
            title:'Subscribe Email',
            active:'subscribeemail',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('deletePostSuccessMsg'),
            ErrorMsg: req.flash('deletePostErrorMsg'),
        });
    },
    add: function(req, res, next){
        res.render('admin/subscribeemail/add',{
            active:'contact',
            title:'Subscribe Email',
            userData: req.session.user,
            ComData: req.session.ComDetail,
            SuccessMsg: req.flash('EmailSuccessMsg'),
            ErrorMsg: req.flash('EmailErrorMsg'),
        });
    },
    addsave: async function(req, res, next){
        try {
            const ValidationCheck = new Validator(req.body, {
                email: 'required',
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
                //req.flash('homeErrorMsg', errorStr);
                return res.status(200).json({ status: false, message: errorStr });
            }
            var EmailFoud = await Common.CustomQuery(`SELECT * FROM subscribeemail WHERE email="${req.body.email}"`)
            if(EmailFoud.length > 0){
                return res.status(200).json({ status: false, message: 'Email Already Exist!' });
            }

            message = "Added Successfully";
            var DataObject = {
                'email': req.body.email,
            }
            DataObject.created_by = 1;
            DataObject.created_on = new Date();
            await Common.insert('subscribeemail', DataObject)
            
            req.flash('homeSuccessMsg', 'Email Added successfully!');
            //return res.redirect('/'); 
            return res.status(200).json({ status: true, message: 'Thanks for Subscribe' });

        } catch (ex) {
            console.log(ex);
            //Logs.ErrorHandler(ex, res)
        }
    },
    delete: async function(req, res, next){
        var DataObj = await Common.CustomQuery(`DELETE FROM subscribeemail WHERE id=${req.params.id}`)
        req.flash('deletePostSuccessMsg', 'Email deleted successfully!');
        return res.redirect('/admin/subscribeemail/');    
    }
}
module.exports = subscribeemail;
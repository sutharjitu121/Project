const Common = require('../../model/common');
const { Validator } = require('node-input-validator');


var membership = {
    index: async function(req, res, next){
        var DataObject = await Common.select('membership');
        res.render('admin/membership/list',{
            title:'Member',
            active:'member',
            Data:DataObject,
            userData: req.session.user,
            ComData: req.session.ComDetail,
        });
    },
    register: async function (req, res) {
        try {
            console.log(req.body)
            const ValidationCheck = new Validator(req.body, {
                name: 'required',
                fathername: 'required',
                mobile: 'required',
                email: 'required',
                education: 'required',
                workplace: 'required',
                address: 'required',
                demo: 'required',
            });

            var FormaValidationError = await ValidationCheck.check();
            if (!FormaValidationError) {
                return res.status(400).json({ status: false, message: ValidationCheck.errors, data: ValidationCheck.errors });
            }

            dataEmail = await Common.selectWhere('membership', 'EmailID = "' + req.body.email.trim() + '"');
            if (dataEmail.length > 0) {
                return res.status(200).json({ status: false, message: "Email address already registered", data: [] });
            }

            dataMobile = await Common.selectWhere('membership', 'MobileNo = "' + req.body.mobile.trim() + '"');
            if (dataMobile.length > 0) {
                return res.status(200).json({ status: false, message: "Mobile no. already registered", data: [] });
            }

            var DataObject = {
                'Name': req.body.name,
                'FatherName': req.body.fathername,
                'MobileNo': req.body.mobile,
                'EmailID': req.body.email,
                'Education': req.body.education,
                'WorkPlace': req.body.workplace,
                'Address': req.body.address,
                'Amount': req.body.demo,
                'ModifiedBy': 0,
                'ModifiedOn': new Date(),
                'CreatedBy': 0,
                'CreatedOn': new Date(),
                surl:  "http://localhost:3000/payu/success",
                furl:  "http://localhost:3000/payu/fail"
            }
            
            await Common.insert('membership', DataObject)

            return res.status(200).json({ status: true, message: 'Registration Successfully!', data: [] });

        } catch (ex) {
            console.log(ex)
        }
    }
}
module.exports = membership;
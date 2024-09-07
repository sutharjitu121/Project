const express = require('express')
const router = express.Router()
const subscribeemail = require('../../controller/admin/subscribeemail.controller');
const auth = require('../../controller/admin/auth.controller');

router.get('/', auth.sessionChecker, function (req, res, next) {
    subscribeemail.index(req, res, next);
});
router.get('/add', auth.sessionChecker, function (req, res, next) {
    subscribeemail.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    subscribeemail.addsave(req, res, next);
});
router.get('/isactive/:id', auth.sessionChecker, function (req, res, next) {
    subscribeemail.is_active(req, res, next);
});


module.exports = router
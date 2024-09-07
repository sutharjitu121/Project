const express = require('express')
const router = express.Router()
const contact = require('../../controller/admin/contact.controller');
const auth = require('../../controller/admin/auth.controller');

router.get('/',auth.sessionChecker, function (req, res, next) {
    contact.index(req, res, next);
});
router.get('/add',auth.sessionChecker, function (req, res, next) {
    contact.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    contact.addsave(req, res, next);
});
router.get('/edit/:id',auth.sessionChecker, function (req, res, next) {
    contact.edit(req, res, next);
});
router.post('/editsave',auth.sessionChecker, function (req, res, next) {
    contact.editsave(req, res, next);
});
router.get('/delete/:id', auth.sessionChecker,function (req, res, next) {
    contact.delete(req, res, next);
});
router.get('/isactive/:id',auth.sessionChecker, function (req, res, next) {
    contact.is_active(req, res, next);
});



module.exports = router
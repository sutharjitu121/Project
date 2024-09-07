const express = require('express')
const router = express.Router()
const user = require('../../controller/admin/user.controller');

router.get('/', function (req, res, next) {
    user.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    user.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    user.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    user.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    user.editSave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    user.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    user.is_active(req, res, next);
});


module.exports = router
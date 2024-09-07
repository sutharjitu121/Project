const express = require('express')
const router = express.Router()
const about = require('../../controller/admin/about.controller');

router.get('/', function (req, res, next) {
    about.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    about.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    about.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    about.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    about.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    about.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    about.is_active(req, res, next);
});


module.exports = router
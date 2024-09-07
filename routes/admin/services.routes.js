const express = require('express')
const router = express.Router()
const services = require('../../controller/admin/services.controller');

router.get('/', function (req, res, next) {
    services.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    services.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    services.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    services.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    services.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    services.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    services.is_active(req, res, next);
});


module.exports = router
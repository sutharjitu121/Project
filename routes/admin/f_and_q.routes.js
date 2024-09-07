const express = require('express')
const router = express.Router()
const f_and_q = require('../../controller/admin/f_and_q.controller');

router.get('/', function (req, res, next) {
    f_and_q.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    f_and_q.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    f_and_q.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    f_and_q.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    f_and_q.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    f_and_q.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    f_and_q.is_active(req, res, next);
});

module.exports = router
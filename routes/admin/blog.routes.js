const express = require('express')
const router = express.Router()
const blog = require('../../controller/admin/blog.controller');

router.get('/', function (req, res, next) {
    blog.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    blog.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    blog.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    blog.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    blog.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    blog.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    blog.is_active(req, res, next);
});


module.exports = router
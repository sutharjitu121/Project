const express = require('express')
const router = express.Router()
const gallery_category = require('../../controller/admin/gallery_category.controller');

router.get('/', function (req, res, next) {
    gallery_category.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    gallery_category.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    gallery_category.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    gallery_category.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    gallery_category.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    gallery_category.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    gallery_category.is_active(req, res, next);
});
router.get('/is_show/:id', function (req, res, next) {
    gallery_category.is_show(req, res, next);
});


module.exports = router
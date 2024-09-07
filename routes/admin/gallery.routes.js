const express = require('express')
const router = express.Router()
const gallery = require('../../controller/admin/gallery.controller');

router.get('/', function (req, res, next) {
    gallery.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    gallery.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    gallery.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    gallery.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    gallery.editSave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    gallery.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    gallery.is_active(req, res, next);
});



module.exports = router
const express = require('express')
const router = express.Router()
const review = require('../../controller/admin/review.controller');

router.get('/', function (req, res, next) {
    review.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    review.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    review.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    review.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    review.editsave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    review.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    review.is_active(req, res, next);
});


module.exports = router
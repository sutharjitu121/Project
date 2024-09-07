const express = require('express')
const router = express.Router()
const video = require('../../controller/admin/video.controller');

router.get('/', function (req, res, next) {
    video.index(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    video.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    video.editSave(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    video.is_active(req, res, next);
});


module.exports = router
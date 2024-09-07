const express = require('express')
const router = express.Router()
const setting = require('../../controller/admin/setting.controller');

router.get('/', function (req, res, next) {
    setting.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    setting.editSave(req, res, next);
});

module.exports = router
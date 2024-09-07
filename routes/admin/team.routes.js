const express = require('express')
const router = express.Router()
const team = require('../../controller/admin/team.controller');

router.get('/', function (req, res, next) {
    team.index(req, res, next);
});
router.get('/add', function (req, res, next) {
    team.add(req, res, next);
});
router.post('/addsave', function (req, res, next) {
    team.addsave(req, res, next);
});
router.get('/edit/:id', function (req, res, next) {
    team.edit(req, res, next);
});
router.post('/editsave', function (req, res, next) {
    team.editSave(req, res, next);
});
router.get('/delete/:id', function (req, res, next) {
    team.delete(req, res, next);
});
router.get('/isactive/:id', function (req, res, next) {
    team.is_active(req, res, next);
});



module.exports = router
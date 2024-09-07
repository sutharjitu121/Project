const express = require('express')
const router = express.Router()
const home = require('../../controller/admin/home.controller');
const auth = require('../../controller/admin/auth.controller');

router.get('/', auth.sessionChecker, function (req, res, next) {
    res.redirect('/admin/dashboard');
});
router.get('/login', auth.sessionChecker, function (req, res, next) {
    res.redirect('/admin/dashboard');
});
router.post('/login', function (req, res, next) {
    auth.login(req, res, next);
});
router.get('/logout', function (req, res, next) {
    auth.logout(req, res, next);
});
router.get('/forgot-password', function (req, res, next) {
    auth.forget_password_get(req, res, next);
});
router.post('/forgot-password', function (req, res, next) {
    auth.forget_password(req, res, next);
});
router.get('/forgot-password/:key', function (req, res, next) {
    auth.reset_password(req, res, next);
});
router.post('/forgot-password/save', function (req, res, next) {
    auth.reset_password_save(req, res, next);
});
router.get('/dashboard', auth.sessionChecker, function (req, res, next) {
    home.index(req, res, next);
});

module.exports = router
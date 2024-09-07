const express = require('express')
const router = express.Router()
const home = require('../controller/home.controller');

router.get('/', function (req, res, next) {
    home.index(req, res, next);
});
router.get('/blog/:id/:title?', function (req, res, next) {
    home.readmore(req, res, next);
});
router.get('/membership', function (req, res, next) {
    home.membership(req, res, next);
});


module.exports = router
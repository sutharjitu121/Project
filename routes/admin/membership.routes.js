const express = require('express')
const router = express.Router()
const membership = require('../../controller/admin/membership.controller');

router.get('/', function (req, res, next) {
    membership.index(req, res, next);
});
router.post('/register', function (req, res, next) {
    membership.register(req, res, next);
});

module.exports = router
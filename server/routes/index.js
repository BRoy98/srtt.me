'use strict';
const express = require('express');
const router = express.Router();

router.use('/url/', require('./url'));
router.use('/auth/', require('./auth'));

router.get('*', (req, res, next) => {
    next();
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.use('/url/', require('./url'));

router.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

router.post('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;
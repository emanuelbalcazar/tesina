/**
 * Route application module
 * @author Emanuel Balcazar
 */
const express = require('express');
const router = express.Router();

// information route about the application.
router.get('/info', (req, res) => {
    let info = { name: "crawl extractors", version: "2020-08", status: "active" };
    return res.json(info);
});

module.exports = router;

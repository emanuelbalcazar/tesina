/**
 * Route application module
 * @author Emanuel Balcazar
 */
const express = require('express');
const router = express.Router();
const service = require('../services/extractor.service');

// information route about the application.
router.get('/', (req, res) => {
    let info = { name: "crawl extractors", version: "2020-09", status: "active" };
    return res.json(info);
});

// execute a extraction
router.post('/extract', async (req, res, next) => {
    try {
        let results = await service.extract(req.body, "default");
        return res.json(results);
    } catch (error) {
        return res.status(400).json({ code: 400, message: error.message, stack: error.stack });
    }
});

module.exports = router;

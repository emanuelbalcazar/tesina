/**
 * Route application module
 * @author Emanuel Balcazar
 */
const express = require('express');
const router = express.Router();
const service = require('../services/search.service');

// information route about the application.
router.get('/', (req, res) => {
    let info = { name: 'search engine', version: '2022-02', status: 'active' };
    return res.json(info);
});

// execute a search
router.post('/search', async (req, res) => {
    try {
        let results = await service.search(req.body, 'google');
        return res.json(results);
    } catch (error) {
        return res.status(400).json({ code: 400, message: error.message, stack: error.stack });
    }
});

module.exports = router;

/**
 * Route application module
 * @author Emanuel Balcazar
 */
const express = require('express');
const router = express.Router();
const factory = require('../searcher/factory');
const strategy = require('../searcher/index');

// information route about the application.
router.get('/info', (req, res) => {
    let info = { name: "search engine", version: "2020-08", status: "active" };
    return res.json(info);
});

// execute a search
router.post('/search', async (req, res, next) => {
    try {
        let Searcher = factory.getSearcher(req.body.source);
        strategy.setStrategy(new Searcher());
        let results = await strategy.execute(req.body.equation);
        return res.json(results);
    } catch (error) {
        return res.status(401).json({ code: 401, message: error.message });
    }
});

module.exports = router;

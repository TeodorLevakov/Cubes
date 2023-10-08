const router = require('express').Router();

const { getAll } = require('../services/cubeService');


router.get('/', (req, res) => {
    let { search, from, to} = req.query;


    const cubes = getAll(search, from, to);
    res.render('index', { cubes });
});


router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;








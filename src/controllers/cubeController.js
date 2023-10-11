const router = require('express').Router();

const { create } = require('express-handlebars');
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    const cube = req.body;
    //validate
    if (cube.name.length < 2) {
        return res.status(400).send('invalid name');
    }

    try {
        await cubeService.create(cube);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
    //save data
    // save(cube)
    //     .then(() => {
    //         res.redirect('/');
    //     }).catch(err => {
    //         res.status(400).send(err);
    //     });
});

router.get('/details/:id', async (req, res) => {

    const cubeId = req.params.id;

    const cube = await cubeService.getOne(cubeId).lean();

    res.render('details', { cube });

});


module.exports = router;
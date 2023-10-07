const router = require('express').Router();

const { save, getOne } = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {

    const cube = req.body;
    //validate
    if (cube.name.length < 2) {
        return res.status(400).send('invalid name');
    }
    //save data
    save(cube)
        .then(() => {
            res.redirect('/');
        }).catch(err => {
            res.status(400).send(err);
        });
});

router.get('/details/:id', (req, res) => {

    const cubeId = Number(req.params.id);

    const cube = getOne(cubeId);

    res.render('details', { cube });

});


module.exports = router;
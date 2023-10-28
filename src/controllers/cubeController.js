const router = require('express').Router();

const { create } = require('express-handlebars');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {

    const cube = req.body;
    cube.owner = req.user._id;
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

    const cube = await cubeService.getOneDetails(cubeId).lean();

    const isOwner = cube.owner == req.user?._id;

    res.render('details', { cube, isOwner });

});

router.get('/:cubeid/attach', async (req, res) => {
    
    const cube = await cubeService.getOne(req.params.cubeid).lean();

    const accessories = await accessoryService.getAllWhithout(cube.accessories).lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/:cubeId/attach', async (req, res) => {
    
    const accessId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});


router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (cube.owner != req.user._id) {
        return res.redirect('/404');
    };

    if(!cube){
        return res.redirect('/404');
    }
    res.render('cube/edit', {cube});
});

router.post('/:cubeId/edit', async (req, res) => {
    const modify = await cubeService.edit(req.params.cubeId, req.body);

    res.redirect(`/cube/details/${modify._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();

    res.render('cube/delete', {cube});
});

router.post('/:cubeId/delete', async (req, res) => {

    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});

module.exports = router;
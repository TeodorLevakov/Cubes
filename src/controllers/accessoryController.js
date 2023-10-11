const router = require('express').Router();

router.get('/create', (req, res) => {


    res.render('createAccessory');
});

router.post('/create', (req, res) => {

    const access = req.body;
    console.log(access);

    res.render('/');
});


module.exports = router;
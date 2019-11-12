var express = require('express');
const jwt = require('jsonwebtoken');
//const pool = require('../config/database');
const auth = require('../config/auth.js');

var router = express.Router();

const models = require('../models');

router.get('/list', (req, res) => {
    /*pool.query('SELECT * FROM productos', (e, r) => {
        res.json(r);
    });*/
    //res.json(models.Product.findAll());

    /* res.json(
         models.Product.create({
             title: req.query.title,
             price: req.query.price,
             content: req.query.content
         }).then(function (data) {
             if (data) {
                 res.send(data);
             } else {
                 res.status(400).send('Error in insert new record');
             }
         })
     )*/

    return models.Product.update(
        {
            title: req.query.title,
            price: req.query.price,
            content: req.query.content
        },
        {
            where:
                {
                    id:2
                }
        }
    ).then(function (data) {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });

});

router.get('/show/:id', auth.jwtVerify, (req, res) => {
    jwt.verify(req.token, auth.password, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var id = pool.escape(req.params.id);
            pool.query('SELECT * FROM productos WHERE id = ' + id, (e, r) => {
                res.json(r);
            });
        }
    });
});


router.post('/create', auth.jwtVerify, (req, res) => {
    jwt.verify(req.token, auth.password, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var email = pool.escape(req.query.email);
            var password = pool.escape(req.query.password);
            pool.query('INSERT INTO productos (`email`, `password`) VALUE (' + email + ',' + password + ')', (e, r) => {
                res.json(r);
            });
        }
    });
});


router.put('/edit/:id', auth.jwtVerify, (req, res) => {
    jwt.verify(req.token, auth.password, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var email = pool.escape(req.query.email);
            var password = pool.escape(req.query.password);
            var id = pool.escape(req.params.id);
            pool.query('UPDATE `productos` SET `email` = ' + email + ', `password` = ' + password + ' WHERE id = ' + id, (e, r) => {
                res.json(r);
            });
        }
    });
});


router.post('/delete', auth.jwtVerify, (req, res) => {
    jwt.verify(req.token, auth.password, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var id = pool.escape(req.query.id);
            pool.query('DELETE FROM `productos` WHERE id = ' + id, (e, r) => {
                res.json(r);
            });
        }
    });
});


module.exports = router;
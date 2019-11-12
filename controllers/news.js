const model = require('../models');
const auth = require('../config/auth');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return model.news.create(req.query)
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({ error: 'No se pudo realizar la acción.' })
                    }
                })
                .catch(error => {
                    res.status(400).json(error);
                })
        } else {
            res.json({ error: 'Token incorrecto o expirado' })
        }
    });
};

exports.read = (req, res) => {
    return model.news.findAll({ where: req.query })
        .then(function (data) {
            if (data.length != 0) {
                res.json(data)
            } else {
                res.sendStatus(403)
            }
        });
};

exports.update = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return model.news.update(req.query, { where: { id: req.params.id } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({ error: 'No se pudo realizar la acción.' })
                    }
                });
        } else {
            res.json({ error: 'Token incorrecto o expirado' })
        }
    });
};

exports.delete = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return model.news.destroy({ where: { id: req.query } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({ error: 'No se pudo realizar la acción.' })
                    }
                });
        } else {
            res.json({ error: 'Token incorrecto o expirado' })
        }
    });
};
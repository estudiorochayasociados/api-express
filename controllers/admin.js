var models = require('../models');
var admin = models.admin;

const auth = require('../config/auth');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    if (email && password) {
        return admin.findAll({
            where: req.query
        }).then(function (data) {
            if (data.length != 0) {
                var token = jwt.sign({ data }, auth.admin, { expiresIn: '1h' });
                res.json({ data: data, token: token });
            } else {
                res.json({error: 'No se ha encontrado ese usuario'})
            }
        })
    } else {
        res.json({error: 'Token incorrecto o expirado'})
    }
}

exports.create = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return model.admin.create(req.query)
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({error: 'No se cargó correctamente el registro'})
                    }
                });
        } else {
            res.sendStatus(403)
        }
    });
};

exports.read = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return admin.findAll({ where: req.query })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({error: 'Error al leer los registros'})
                    }
                });
        } else {
            res.json({error: 'Token incorrecto o expirado'})
        }
    });
};

exports.update = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return admin.update(req.query, { where: { id: req.params.id } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({error: 'No se actualizó correctamente el registro'})
                    }
                });
        } else {
            res.json({error: 'Token incorrecto o expirado'})
        }
    });
};

exports.delete = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return admin.destroy({ where: { id: req.query } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.json({error: 'No se borró correctamente el registro'})
                    }
                });
        } else {
            res.json({error: 'Token incorrecto o expirado'})
        }
    });
};
const orm = require('../models');
const auth = require('../config/auth');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    if (email && password) {
        return orm.Admin.findAll({
            where: req.query
        }).then(function (data) {
            if (data.length != 0) {
                var token = jwt.sign({ data }, auth.admin, { expiresIn: '1h' });
                res.json({ data: data, token: token });
            } else {
                res.sendStatus(403)
            }
        })
    } else {
        res.sendStatus(403)
    }
}

exports.create = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return orm.Admin.create(req.query)
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.sendStatus(403)
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
            return orm.Admin.findAll({ where: req.query })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.sendStatus(403)
                    }
                });
        } else {
            res.sendStatus(403)
        }
    });
};

exports.update = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return orm.Admin.update(req.query, { where: { id: req.params.id } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.sendStatus(403)
                    }
                });
        } else {
            res.sendStatus(403)
        }
    });
};

exports.delete = (req, res) => {
    jwt.verify(req.token, auth.admin, (err, data) => {
        if (data) {
            return orm.Admin.destroy({ where: { id: req.query } })
                .then(function (data) {
                    if (data.length != 0) {
                        res.json(data)
                    } else {
                        res.sendStatus(403)
                    }
                });
        } else {
            res.sendStatus(403)
        }
    });
};
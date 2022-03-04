const { Router } = require('express');
const login = new Router();
const conexion = require('./../bd');

login.get('/login', (req, res, next) => {
    res.render('login', {
        message: null
    });
});

login.post('/login', async (req, res, next) => {
    try {
        let a = req.body.usuario;
        let b = req.body.password;
        let sql = "select id_usuario,nombre from usuario where mail = ? and password = ?";
        const query = await conexion.query(sql, [a, b], (error, results) => {
            if (error) {
                throw error;
            } else {
                if (results.length > 0) {
                    req.session.usuario = results[0].id_usuario;
                    console.log(`El valor de la session en usuario vale : ${req.session.usuario}`);
                    res.redirect('/noticias');
                } else {
                    res.render('login', { message: "Usuario o contraseña incorrectos" })
                }
                console.log(req.body);
            }
        })

    } catch (error) {
        throw error;
    }
});


module.exports = login;
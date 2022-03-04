const {Router} = require('express');
const admin = new Router();
const conexion = require('./../bd');

admin.get('/admin',(req,res)=>{
    res.render('admin',{
        message: null
    });
})

admin.post('/admin',async (req,res)=>{
    try {
        let a = req.body.useradmin;
        let b = req.body.password
        let sql = "select id_usuario,nombre from admin where mail = ? and password = ?";
        const query = await conexion.query(sql, [a, b], (error, results) => {
            if (error) {
                throw error;
            } else {
                if (results.length > 0) {
                    req.session.admin = results[0].id_usuario;
                    console.log(`El valor de la session en usuario vale : ${req.session.admin}`);
                    res.redirect('/noticias');
                } else {
                    res.render('admin', { message: "Usuario o contraseña incorrectos" })
                }
                console.log(req.body);
            }
        })
    } catch (error) {
        throw error;
    }
})

module.exports = admin;
const { Router } = require('express');
const registro = new Router();
const conexion = require('./../bd');

registro.get('/registro', (req, res) => {
    res.render('registro');
});

registro.post('/registro', async (req, res) => {
    try {
        let data = { nombre: req.body.nombre_completo, mail: req.body.mail_usuario, password: req.body.clave, fecha_nac: req.body.fechaNac, permisos: req.body.permisos };
        let sql = `insert into usuario set ?`;
        let query = await conexion.query(sql, data, (error, results) => {
            if (error) {
                throw error;
            }
            console.log(query);
            res.render('registroexitoso', {
                exito: "Registro Exitoso",
                tituloexito: "Te has registrado exitosamente",
                mensajeexito: "Muchas gracias por registrarte en nuestra página, ahora podrás comentar las noticias que hemos subido."
            });
        });
    } catch (error) {
        throw error;
    }
});





module.exports = registro;
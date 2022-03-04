const { Router } = require('express');
const noticia = new Router();
const conexion = require('./../bd');
const { proto } = require('once');
const storage = require('./../multer');
const multer = require('multer');
const upload = multer({ storage });

//Sección general donde aparecen todas las noticias

noticia.get('/noticias', async (req, res) => {
    let admin_session = false;
    req.session.admin ? admin_session = true : admin_session = false;
    let sql = "select *,DATE_FORMAT(fecha_creacion,'%d/%m/%Y') as fecha from noticias order by id_noticias desc"
    let query = await conexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('noticias', {
                admin: admin_session,
                results: results,
                cabecera: 'Corta la Bocha | Sitio Oficial',
                titulo: 'Corta la Bocha | Diario Digital',
                titulo2: 'CORTA LA BOCHA',
                celular: '+54 (297) 5908539',
                email: 'clb.diario.digital@gmail.com',
                noticias: 'Noticias',
                enterate: 'ENTERATE DE LO QUE SUCEDE',
                info: 'Toda la información de lo ocurrido en nuestra localidad y más',
                ayudanos: 'ayudanos a crecer',
                nosinteresa: 'EN CLB NOS INTERESA LA OPINIÓN DEL PÚBLICO',
                entra: 'Registrate,iniciá sesión y danos tu opinión en la sección comentarios de cada noticia',
                articuloboton: 'Registro',
                contanos: 'Contanos lo que sabes',
                atentos: 'ESTAMOS ATENTOS A LO QUE ESTÁ PASANDO',
                contactate: 'Contactate con nostros si te enteraste de algún acontecimiento interesante o hay algo que querés decir',
                contactoboton: 'Contacto',
                periodismo: 'PERIODÍSMO POLÍTICO',
                descripcion: 'En Corta La Bocha te brindaremos toda la información actualizada sobre lo que sucede en el ámbito político de nuestra ciudad y más.',
                articulotitulo: 'ARTÍCULO DEL DÍA',
                descripcion2: 'Como nos interesa saber tu opinión sobre nuestras publicaciones hemos incorporado la sección "Artículo del día" a nuestra web donde podrás opinar sobre la noticia más importante del día.',
                servicio: 'SERVICIO A LA COMUNIDAD',
                descripcion3: 'Aportamos con la sección servicios donde te informamos sobre el clima,etc',
                iraBoton: 'Ir a la Sección'
            });
        }
    });

});

//Sección particular para ver la noticia

noticia.get('/articulo/:id', async (req, res) => {
    try {
        let admin_session = false;
        req.session.admin ? admin_session = true : admin_session = false;
        let status_session = false;
        req.session.usuario ? status_session = true : status_session = false;
        let sql = `select *,DATE_FORMAT(fecha_creacion,'%d/%m/%Y') as fecha from noticias where id_noticias = ${req.params.id}`;
        let noticia = await conexion.query(sql, (error, results) => {
            if (error) {
                throw error;
            } else {
                let sql_comentarios = `select *,DATE_FORMAT(fecha,'%d/%m/%Y') as fecha from comentario where id_noticias = ${req.params.id} order by id desc`;
                let comentarios = conexion.query(sql_comentarios, (error, resultados) => {
                    if (error) {
                        throw error;
                    }
                    res.render('articulo', {
                        admin: admin_session,
                        results: results,
                        resultados: resultados,
                        status: status_session,
                        id_noticia: req.params.id,
                        cabecera: 'Corta la Bocha | Sitio Oficial',
                        celular: '+54 (297) 5908539',
                        email: 'clb.diario.digital@gmail.com',
                    });

                })
            }
        })
    } catch (error) {
        throw error;
    }
});

noticia.post('/comentar', async (req, res) => {
    try {
        let data = { nombre_usuario: req.body.nombre_usuario, id_noticias: req.body.id_noticia, comentario: req.body.comentario, id_usuario: req.session.usuario };
        let sql = "insert into comentario set ?";
        let query = await conexion.query(sql, data, (error, results) => {
            if (error) {
                throw error;
            }
            res.redirect('/noticias');
            console.log(`El usuario que publica es el : ${req.session.usuario}`);
            console.log(results);
        });
    } catch (error) {
        throw error;
    }
});

noticia.post('/publicar', upload.single('imgUrl'), async (req, res) => {
    try {
        const { body, file } = req;
        if (file) {
            let url = `/images/${file.filename}`;
            let data = { titulo_noticias: body.tituloNoticia, img_url: url, bajada_noticia: body.bajada_Noticia, texto: body.textoNoticia, fuente: body.fuente_noticia };
            let sql = "insert into noticias set ?"
            let query = await conexion.query(sql, data, (error, results) => {
                if (error) {
                    throw error
                };
                res.redirect('/noticias');
                console.log(`El admin que publica es el: ${req.session.admin}`);
                console.log(results);
            })
        } else {
            console.log("no hay ñaca")
        }
    } catch (error) {
        throw error;
    }
    console.log("nueva noticia");
});


noticia.post('/editar', (req, res) => {
    let data = { titulo_noticias: req.body.corregirTitulo,bajada_noticia: req.body.corregirBajada, texto: req.body.corregirTexto, fuente: req.body.corregirFuente};
    let sql = `UPDATE noticias SET titulo_noticias = '${req.body.corregirTitulo}',bajada_noticia = '${req.body.corregirBajada}', texto= '${req.body.corregirTexto}', fuente = '${req.body.corregirFuente}' where id_noticias = ${req.body.idNoticia}`;
    conexion.query(sql,data,(error, results)=>{
        if(error) throw error;
        res.redirect('/noticias');
    })
});


module.exports = noticia;
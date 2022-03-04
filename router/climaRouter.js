const {Router} = require('express');
const clima = new Router();
const conexion = require('./../bd');


clima.get('/clima', (req,res)=>{
    res.render('clima',{
        cabecera: 'Corta la Bocha | Sitio Oficial',
        titulo:'Corta la Bocha | Diario Digital',
        titulo2:'CORTA LA BOCHA',
        celular:'+54 (297) 5908539',
        email: 'clb.diario.digital@gmail.com',
        noticias:'Noticias',
        enterate:'ENTERATE DE LO QUE SUCEDE',
        info:'Toda la información de lo ocurrido en nuestra localidad y más',
        ayudanos:'ayudanos a crecer',
        nosinteresa:'EN CLB NOS INTERESA LA OPINIÓN DEL PÚBLICO',
        entra:'Registrate,iniciá sesión y danos tu opinión en la sección comentarios de cada noticia',
        articuloboton:'Registro',
        contanos:'Contanos lo que sabes',
        atentos:'ESTAMOS ATENTOS A LO QUE ESTÁ PASANDO',
        contactate:'Contactate con nostros si te enteraste de algún acontecimiento interesante o hay algo que querés decir',
        contactoboton:'Contacto'
    });
})



module.exports = clima;
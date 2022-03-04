const { Router } = require('express');
const contacto = new Router();
const nodemailer = require('nodemailer');
const { proto } = require('once');


//Sección principal

contacto.get('/contacto', (req, res) => {
    res.render('contacto', {

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

    })
});

//Sección de envio de e-mail

contacto.post("/send-email", (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const numero = req.body.numero;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }

    });

    let mailOptions = {
        to: "CLB.DIARIO.DIGITAL@GMAIL.COM",
        from: "CLB Seguidores",
        subject: `${asunto}`,
        html: `<h1> <b> Mensaje de ${nombre}</b> para Corta la Bocha : <br> <br>
         ${mensaje}. <br><br>
        Contacto del seguidor: <br><br> E-mail: ${email} <br> Celular: ${numero} </h1>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.render('enviadoexitoso',{

                //Sección principal
                
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
                contactoboton:'Contacto',
                periodismo:'PERIODÍSMO POLÍTICO',
                descripcion:'En Corta La Bocha te brindaremos toda la información actualizada sobre lo que sucede en el ámbito político de nuestra ciudad y más.',
                articulotitulo:'ARTÍCULO DEL DÍA',
                descripcion2:'Como nos interesa saber tu opinión sobre nuestras publicaciones hemos incorporado la sección "Artículo del día" a nuestra web donde podrás opinar sobre la noticia más importante del día.',
                servicio:'SERVICIO A LA COMUNIDAD',
                descripcion3:'Aportamos con la sección servicios donde te informamos sobre el clima,etc',
                iraBoton:'Ir a la Sección',
                exito:'Mensaje enviado',
                tituloexito:'Su mensaje fue enviado exitosamente',
                mensajeexito:'Hemos recibido tu mensaje correctamente. En breve nos pondremos en contacto contigo, te rogamos seas paciente. Muchas gracias por seguirnos y ser parte de nuestra comunidad.'
            });
            res.status(200).jsonp(reqbody);
        }
    });
});


    module.exports = contacto;
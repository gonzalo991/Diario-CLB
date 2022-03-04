const {Router} = require('express');
const router = new Router();


router.get('/', (req, res)=>{
    res.render('home' ,{

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
        iraBoton:'Ir a la Sección'
    })
});




module.exports = router;
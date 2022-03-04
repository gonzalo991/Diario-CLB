//Email prueba
require('dotenv').config();

//Definición de constantes
const express = require('express');
const app = express();
const {urlencoded,json} = require('express');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const port = 5000;

//Definición de handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname+"/views/partials");

//Contenido estatico
app.use(express.static('public'));

//Sesion del usuario
app.use(session({secret: 'noticia01',resave: true, saveUninitialized:false,cookie:{maxAge : 60*60*1000}}))
//Pack Json
app.use(express.json());
app.use(cookieParser());

//decodificador
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));

//Rutas
app.use(require('./router/routes'));
app.use(require('./router/noticias'));
app.use(require('./router/contacto'));
app.use(require('./router/login'));
app.use(require('./router/registro'));
app.use(require('./router/admin'));
app.use(require('./router/climaRouter'));


app.listen(port, ()=>{
    console.log(`Puerto corriento en http://localhost:${port}`);
});

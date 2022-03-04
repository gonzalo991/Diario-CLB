const mysql = require('mysql');

//Conexión a la base de datos
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'clbdb',
    port:'3305'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('¡Conexión Exitosa!')
    }
});


module.exports = conexion;
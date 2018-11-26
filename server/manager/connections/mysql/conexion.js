//Importacion de modulo ||  import with module
let mysql = require('mysql');

//Creamos la conexion generica|| We create the generic connection

module.exports = {
    conexion: () => {
        return mysql.createConnection({
            host: "whatpush-db.cwelljezdura.eu-west-1.rds.amazonaws.com",
            user: "developer1admin",
            port: "3306", //opcional,
            password: "wpadmin989898",
            database: "whatpushmysql"
                /* host: "localhost",
                 user: "user_node",
                 port: "3308", //opcional,
                 password: "123456789",
                 database: "nodepushprueba"*/
        });
    }
};
"use strict"

let mysql = require('mysql');
let Config = require('../config/Config');

class CommercialConditionDAO{
    soma(){
        let connection = mysql.createConnection(Config.db);
        connection.connect();

        connection.query("select 1 + 1 as soma", (err, rows, fields) => {
            if( err ){
                connection.end();
                throw err;
            }
            
            console.log('Result: ' + rows[0].soma);

            connection.end();
        });
    }
}

module.exports = CommercialConditionDAO;
/* Import Modul */
const {createPool} = require('mysql')
const db = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST.DB_PORT,
    password : process.env.DB_PASS,
    database : process.env.MYSQL_DB,
    connectionLimit :10,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

});

module.exports = db 
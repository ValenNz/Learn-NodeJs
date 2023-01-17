/* Import Module */
const http = require('http')     // Import file http dari module untuk menjalankan server  (router)            

/* Router Server with function */
http.createServer(function(res,req){
    res.writeHead(200, {'Content-Type':'text/html'})        // Mengirim kan http(succes)
    res.write('Hallo Dunia')
    res.end()
}).listen(8080) // Berjalan di port 8080

console.log("Aplikasi berjalan") 
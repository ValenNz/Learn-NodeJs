/* Memanggil http (server) */
const http = require('http');
const fs = require('fs'); // memanggil fungsi membaca file
const port = 3000;
const renderHTML = (path, res) =>{
    fs.readFile(path, (err, data) => {
        if(err){ // jika error tampilkan 404
            res.writeHead(404);
            res.write('Error: file not found');
        } else{
            res.write(data);
        }
        res.end(); // respon selesai
    });
};

/* Make server */
http
    .createServer((req, res) => { // apa yang dikirm apa yang dikembalikan
        res.writeHead(200, {
            'Contec-Type': 'text/html'
        }); 

        const url = req.url; // mengambil url berdasarkan req

        /* Switch case */
        switch(url){
            case '/about':
                renderHTML('./about.html', res)
                break;
            case '/contact':
                renderHTML('./contact.html', res)
                break;
            default:
                renderHTML('./about.html',res)
        };

        /* IF else */
        // if( url === '/about') {// jika url = ./about maka tulis hello world
        //    renderHTML('./about.html', res)
        // } else if(url === '/contact'){
        //     renderHTML('./contact.html', res)
        // } else {
        //     renderHTML('./index.html', res)
        // }
    })
    .listen(port, () =>{ // port 3000, localhost  (supaya web bisa jalan)
        console.log(`Serve is listening on port ${port}...`);
}); 



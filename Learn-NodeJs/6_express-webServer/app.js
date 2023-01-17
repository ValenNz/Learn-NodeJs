const express  = require('express'); // Import file expres
const app = express();  //  Make var for declaration express
const port =3000;   // Make port 

/* Route */
app.get('/', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    // res.send('<h1> Hello World </h1>')
    // res.json({
    //     nama: 'Valen',
    //     email: 'valenra05@gmail.com',
    //     ho: 0872654324567,
    // });    // kirimkan responya
    res.sendFile('./index.html', {root: __dirname }); // mengirim file berdasarkan directory kita
});
app.get('/about', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    // res.send('Ini adalah halaman about');    // kirimkan responya
    res.sendFile('./about.html', {root: __dirname }); // mengirim file berdasarkan directory kita
});
app.get('/contact', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    // res.send('Ini adalah halaman contact');    // kirimkan responya`
    res.sendFile('./contact.html', {root: __dirname }); // mengirim file berdasarkan directory kita

});
app.use('/product/:id', (req, res) => { // tangkap id
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`) // mengirimkan berdasarkan id
});


/* Running middleware */
app.use('/', (req, res) => { // akan selalu dijakankan untuk req apapun
    res.send('Test'); // kirimkan respon
});


/* Run the serve */
app.listen(port, () => {
    console.log(`Express app listeningn at http:/localhost:${port}`)
});


// /* Memanggil http (server) */
// const http = require('http');
// const fs = require('fs'); // memanggil fungsi membaca file
// const port = 3000;
// const renderHTML = (path, res) =>{
//     fs.readFile(path, (err, data) => {
//         if(err){ // jika error tampilkan 404
//             res.writeHead(404);
//             res.write('Error: file not found');
//         } else{
//             res.write(data);
//         }
//         res.end(); // respon selesai
//     });
// };

// /* Make server */
// http
//     .createServer((req, res) => { // apa yang dikirm apa yang dikembalikan
//         res.writeHead(200, {
//             'Contec-Type': 'text/html'
//         }); 

//         const url = req.url; // mengambil url berdasarkan req

//         /* Switch case */
//         switch(url){
//             case '/about':
//                 renderHTML('./about.html', res)
//                 break;
//             case '/contact':
//                 renderHTML('./contact.html', res)
//                 break;
//             default:
//                 renderHTML('./about.html',res)
//         };

//         /* IF else */
//         // if( url === '/about') {// jika url = ./about maka tulis hello world
//         //    renderHTML('./about.html', res)
//         // } else if(url === '/contact'){
//         //     renderHTML('./contact.html', res)
//         // } else {
//         //     renderHTML('./index.html', res)
//         // }
//     })
//     .listen(port, () =>{ // port 3000, localhost  (supaya web bisa jalan)
//         console.log(`Serve is listening on port ${port}...`);
// }); 



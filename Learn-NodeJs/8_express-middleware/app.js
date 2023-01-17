const express  = require('express'); // Import file expres
const expressLayouts = require('express-ejs-layouts'); // impoert class layouts
const app = express();  //  Make var for declaration express
const morgan = require('morgan');

const port =3000;   // Make port 

/* Use ejs */
app.set('view engine', 'ejs');

/* Third party middleware */
app.use(expressLayouts);

/* Morgan */
app.use(morgan('dev'));

/* Build in middleware */
app.use(express.static('public'));


/* App midellware */
app.use(function(req, res, next){
    console.log('Time: ', Date.now());
    next(); // setelah middleware dijankan menjalankan middleware
});
app.use(function(req, res, next){
    console.log('Middleware ke 2');
    next(); // setelah middleware dijankan menjalankan middleware
});

/* Route */
app.get('/', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    const pelajar = [
        {
           nama : 'Nuevalen Refitra Alswando',
           email : 'nuevslnra5@gmail.com' 
        },
        {
            nama : 'Recha Audria RE',
            email : 'recha03@gmail.com'
        },
        {
            nama : 'Alfin Hilmawan',
            email : 'alfin@gmail.com'
        },
    ];
    res.render('index', { // cara kirim data dengan nambah parm berisi objecct yang akan terkirim kedalam view index
        nama: 'Nuevalen Refitra Alswano',
        title: 'Halaman Home',
        pelajar,
        layout: '../layouts/main-layout',
    }); 
});
app.get('/about', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    res.render('about', {
        layout: '../layouts/main-layout',
        title : 'Halaman About'
        });
});
app.get('/contact', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    res.render('contact', {
        layout: '../layouts/main-layout',
        title : 'Halaman Contact'
    });
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

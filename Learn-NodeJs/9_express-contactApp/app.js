const express  = require('express'); // Import file expres
const expressLayouts = require('express-ejs-layouts'); // impoert class layouts
const app = express();  //  Make var for declaration express
const port =3000;   // Make port 
const {loadContact, findContact} = require('./utils/contacts')

/* Use ejs */
app.set('view engine', 'ejs');

/* Third party middleware */
app.use(expressLayouts);

/* Build in middleware */
app.use(express.static('public'));

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

/* Show */
app.get('/contact', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    const contacts = loadContact();
    res.render('contact', {   
        layout: '../layouts/main-layout',
        title : 'Halaman Contact',
        contacts
    });
});

/* Detail */
app.get('/contact/:nama', (req , res) => {  // jika ada req get ke halaman route maka jalankan fungsi beriku
    const contact = findContact(req.params.nama);
    res.render('detail', {   
        layout: '../layouts/main-layout',
        title : 'Halaman detail',
        contact,
    });
});









/* Running middleware */
app.use('/', (req, res) => { // akan selalu dijakankan untuk req apapun
    res.send('Test'); // kirimkan respon
});


/* Run the serve */
app.listen(port, () => {
    console.log(`Express app listeningn at http:/localhost:${port}`)
});

const express  = require('express'); // Import file expres
const expressLayouts = require('express-ejs-layouts'); // impoert class layouts
const app = express();  //  Make var for declaration express
const port =3000;   // Make port 
const {loadContact, findContact, addContact,cekDuplikat} = require('./utils/contacts')
const {body, validationResult, check} = require('express-validator');
const { renderFile } = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

/* Use ejs */
app.set('view engine', 'ejs');

/* Third party middleware */
app.use(expressLayouts);

/* Build in middleware */
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // mengirim data ke server

/* Konfigurasi fresh */
app.use(cookieParser('secret'));
app.use(
    session({
    cookie: { maxAge: 6000},
    secret: 'secrete',
    resave: true,
    saveUnitialized: true,
})
);
app.use(flash());


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
        contacts,
        msg: req.flash('msg'), // Menagkap data
    });
});

/* Form Add */
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: '../layouts/main-layout',
        title : 'Add contact',
    });
});

/* Add */
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat){
            throw new Error('Nama cotact sudah terdaftar!!');
        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('hp','No hp tidak valid!!').isMobilePhone('id-ID')
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // jika error tidak kosong
        // return res.status(400).json({errors: errors.array()});
        res.render('add-contact', {
            layout: '../layouts/main-layout',
            title : 'Add contact',
            errors: errors.array(),
        });
    } else{
        addContact(req.body);
        /* Kirim flesh massage */
        req.flash('msg', 'Data contact berhasil ditambahkan!!');
        res.redirect('/contact');
    }
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

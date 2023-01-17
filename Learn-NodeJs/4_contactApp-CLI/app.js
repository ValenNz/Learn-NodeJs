const yargs = require("yargs");
const contacts = require("./contacts");
/* Core Module */

/* File Untuk Isi data */

/* Cara mendapatkan argumen */
console.log(yargs.argv); // argv : mendapat kan arugemen

/* Create */
yargs.command({
    command: 'add', // ketika perintah add dijalankan harus isi tiga form
    describe: 'Create contact',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demondOption:true, // harus di isi atau tidak
            type: 'string',
        },
        email: {
            describe: 'Email',
            demondOption:true,
            type: 'string',
        },
        hp: {
            describe: 'hp',
            demondOption: false,
            type: 'string'
        }
    },
    /*  */
    handler(argv){ // menerima argumen yang dikirim contact.js
        contacts.createContact(argv.nama, argv.email, argv.hp);
    },
}).demandCommand(); // Menampilkan warning

/* Show */
yargs.command({
    command: 'show', // ketika perintah show maka akan menampilkan semua isi contact
    describe: 'Show data contact',
    handler(){ // menerima argument
        contacts.showContact();
    }
});

/* Detail */
yargs.command({
    command: 'detail', // ketika perintah detail maka akan menampilkan semua isi contact
    describe: 'detail data contact',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demondOption:true, // harus di isi atau tidak
            type: 'string',
        },
    },
    handler(argv){ // menerima argument
        contacts.detailContact(argv. nama);
    }
});

/* Delete */
yargs.command({
    command: 'delete', // ketika perintah delete maka akan menghapusn isi contact berdasarkan nama
    describe: 'delete data contact',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demondOption:true, // harus di isi atau tidak
            type: 'string',
        },
    },
    handler(argv){ // menerima argument
        contacts.deleteContact(argv. nama);
    }
});

yargs.parse(); // menjalankan yargs




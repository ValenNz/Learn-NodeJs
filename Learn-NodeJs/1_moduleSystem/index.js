
/* Make Variable */
const nama = 'Nuevalen Refitra';
console.log('Hello Valenz');

/* Cetak variable with function */
// conts cetakNama = (nama) => {
//     return `Hi, nama saya ${nama}`;
// };


// const cetakNama = (nama) => `Hi, Nama Saya ${nama}`;
/**
 *  const cetakNama : nama function
 *  Argument Arrow Function (nama)
 *  Fill : Hi, Nama Saya 
 *  ${nama} : mengambiil dari argumen
 * 
*/

/* Output  */
// console.log(cetakNama(nama)); // ambil dari parameter function
console.log('Hello Valenz');
console.log(nama);  // ambil dari variabel

/* Menjalankan file index dengan file coba dengan menggunakan require  */
// const fs = require('fs'); // menangkap pfile yang diexpore (Core Modul)
// const cetakNama = require('./coba'); // menangkap dari file yang diexpors (local module)
// const moment = require('moment'); // Third party module / npm module / tersimpan di node_modules

/* Local Module */
const coba  =require('./coba'); // menangkap exports file
console.log(
    coba.cetakNama('ValenNz'),  // Function
    coba.PI,                    // Variabel
    coba.pelajar.cetakPljr(),   // Object
    new coba.Person()           // Class
    ); 



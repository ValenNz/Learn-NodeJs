/* File untuk proses menyimpan data */

/* Use Core Modul */
const fs = require('fs');
// console.log(fs); // melihat function napa saja yang dapat dipakai
const validator = require('validator');// import class validatoe
 
/** Membuat Folder Data
 *  -   Mengecek dan Membuat Direcory terlebih dahulu (ada atau tidak)
 */

const dirPath = './data'; // Membuat var yang berisi ke alamat folder data
if(!fs.existsSync(dirPath)){ // cek apakah direktory ini tidak ada maka kita buat direktiory baru
    fs.mkdirSync(dirPath); // buatkan foldernua
}
/** Membuat file Json
 *  -   Mengecek dan Membuat file.json terlebih dahulu (ada atau tidak)
 */
const dataPath = './data/contacts.json'; // membbuat var yang berisi ke alamat file contacts.json
if(!fs.existsSync(dataPath)){   // cek apakah file.json ini tidak ada maka kita buat direktiory baru
    fs.writeFileSync(dataPath, '[]', 'utf-8'); // Membuat file.json dengan isi array kosong dan enkodingnya utf-8 (otomatis format string);
}

/* Function Mengelola data Contact*/
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8'); // baca isi file
    const contacts = JSON.parse(file); // convert string to JSON
    return contacts;
}

/* Funtion Creat contact  */
const createContact = (nama, email,hp) => {
    const contact = { nama,email,hp }; // menangkap jawaban berupa object
    const contacts = loadContact(); // memanggil fungsi (isi semua data kontak)

    /* Validasi data */
    const duplikat = contacts.find((contact) => contact.nama === nama);// apakah nama yg di JSON sama dengan di isi user
    if (duplikat){ // jika duplikat
        console.log('Contact sudah terdaftar');
        return false;
    } 

    /* Cek email */
    if (email){
        if(!validator.isEmail(email)){ // cek penulisan email
            console.log('Email tidak valid');
            return false;
        }
    }

    /* Cek No */
    if (hp){
        if(!validator.isMobilePhone(hp, 'id-ID')){ // cek penulisan hp
            console.log('hp tidak valid');
            return false;
        }
    }

    contacts.push(contact); // melakukan push (pengiriman)
    // console.log(contacts); // print 
        
    /* baca file */
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // membaca file lalu melakuka convert JSON ke string 
        
    console.log('Terima kasih sudah memasukan data')
        
};


/* Function Show Contact */
const showContact = () => {
    const contacts = loadContact(); // memanggil fungsi (isi semua data kontak)
    console.log('Daftar Contact : ');
    contacts.forEach((contact, i) => { // memanggil semua data contact
        console.log(`${i+1}. ${contact.nama} - ${contact.hp}`); // menampilkan index, nama, no hp
    });
};  

/* Function Detail Contact */
const detailContact = (nama) => {
    const contacts = loadContact(); // memanggil fungsi (isi semua data kontak)
    console.log('Detail Contact : ');

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    ); // telusuri contacts nama berdasarkan user tulis, toLowerCase(menganggap huruf kecil)

    if(!contact){ // cek error (nama tidak erdaftar)
        console.log(`${nama} tidak ditemukan`);
        return false;
    };

    console.log(contact.nama);
    console.log(contact.email);
    if(contact.hp){ // jika ada no hp eksekusi program ini
        console.log(contact.hp);
    };  
};  

/* Function Delete Contact */
const deleteContact = (nama) => {
    const contacts = loadContact();
    console.log('Delete Contact : ');
    const newContacts = contacts.filter( // mencari dari setiap contact apakah namanya sama dengan yang dikirim
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );
     
    if(contacts.length == newContacts.length){ // jika array lama ukurunya sama dengan array baru
        console.log(`${nama} tidak ditemukan`);
        return false;
    };

     /* baca file */
     fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts)); // membaca file lalu melakuka convert JSON ke string 
        
     console.log(`Data ${nama} sudah terhapus`);
};

module.exports={createContact, showContact, detailContact, deleteContact}; // export function createContact
/* File untuk proses menyimpan data */

/* Use Core Modul */
const fs = require('fs');
 
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

/* Show */
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8'); // baca isi file
    const contacts = JSON.parse(file); // convert string to JSON
    return contacts;
};

/* Detail */
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );
    return contact;
}

module.exports = {loadContact, findContact};
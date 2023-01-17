/* Core Module */

/* Use Core Modul */
const fs = require('fs');
const { rawListeners } = require('process');
// console.log(fs); // melihat function napa saja yang dapat dipakai

/* Function Core Modul */

/* Write File */
/* String in file (Syncronus) */
// try{    // Menanampun gerro dengan try catch
//     fs.writeFileSync('data/test.txt', 'Hello World secara syncronus'); // luar folder
//     // fs.writeFileSync('test.txt', 'Hello World secara syncronus'); // dalam folder
// } catch(e){
//     console.log(e); 
// }

/* String in file (Asyncronus) */
// fs.writeFile('data/test.txt', 'Hello World secara Asyncronus', (e) => {
//     console.log(e);
// });


/* Read File */
/* Read file (syncronus) */
// const data = fs.readFileSync('data/test.txt', 'utf-8'); // utf-8 merubah buffer menjadi huruf latin
// console.log(data);

/* Read file (Asyncronus) */
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if(err) throw err;  // jika error tendang error nya
//     console.log(data);  // Cetak hasil
// });

/* radline : moduel untuk membaca apa yang kita tuliskan nanti di cmd*/
const readline = require('readline'); // impoert modul

const rl = readline.createInterface({ // buat interface
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan nama anda : ', (nama)=> { // answer (call back funcion)
    rl.question('Masukan asal sekolah : ', (sekolah)=>{
        const contact = { // menangkap jawaban berupa object
            nama,
            sekolah,
        }
        const file = fs.readFileSync('data/contacts.json', 'utf8'); // baca isi file
        const contacts = JSON.parse(file); // convert string to JSON
        contacts.push(contact); // melakukan push (pengiriman)
        console.log(contacts); // print 

        /* baca file */
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // membaca file lalu melakuka convert JSON ke string 

        console.log('Terima kasih sudah memasukan data')

        rl.close();
    });
})
/* Make Arrow Function */
function cetakNama(nama){
    return `Hello, nama saya ${nama}`;
}

/* Make Object */
const PI = 3.14; 

/* Make object deteral */
const pelajar = {
    nama : 'ValenNz',
    umur : 20,
    cetakPljr(){
        return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun`;
    }
}

/* Make Class */
class Person {
    constructor(){ // method yang otomatis dijalankan ketika kelas ini diinstisiasi
        console.log('Object person telah di buat!!');
    }
}

/* Output 
    node namaFile (tulis di terminal)
*/
// console.log('Hello World');

/* Exports
    Supaya file atau deklarasi yang terdapat pada file ini dapat di eksekusi di file lain (digunakan)
*/

/* Penulisan 1 */
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.pelajar = pelajar;
// module.exports.Person = Person;

/* Penunlisan 2 */
// module.exports={
//     cetakNama : cetakNama,  // Function
//     PI : PI,                // Variabel
//     pelajar : pelajar,      // Objext
//     Person : Person,        // Class
// }

/* Penulisan 3 */
module.exports = {cetakNama, PI, pelajar, Person};
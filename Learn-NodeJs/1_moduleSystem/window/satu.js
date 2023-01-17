/* Window
    - Obkject global
*/
console.log(window.alert('Hello World'));

function cetakNama(nama){
    return `Halo, nama saya ${nama}`;
}
// console.log(window.cetakNama(`valen`)); // function ditempe(masuk kedalam object windows)
// console.log(cetakNama(`valen`));

/* kalau kita buat function. function nya masuk kedalam object global window efeknya adalah ketika punya file js lain yang terpisah dari file ini tapi kita panggil sama sama di file index.html functon cetakNama dapat dipakai */
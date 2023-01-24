/* Import Library */
const bodyParser = require("body-parser") // -> Mengambil data dari form pada express
const express = require('express')        // -> Memanggil express
const cors = require("cors")              // -> Mengamankan url pada postman (tidak dapat di acc orang lain)

const app = express() // Definisi router untuk middleware

app.use(bodyParser.json())                          // Extrack data request berformat JSON
app.use(bodyParser.urlencoded({extended: true}))    // Convert car / string ke format url yang valid
app.use(cors())    

/* Endpoin KTP */
app.post("/ktp", (req,res) => {

    /* Menangkap request dari body */
    let nama = req.body.nama
    let alamat = req.body.alamat
    let umur = req.body.umur
    let jenisKelamin = req.body.jenisKelamin
    let tanggalLahir = req.body.tanggalLahir

    /* Membuat response yang akan dikirimkan */
    let response = {
        nama,
        alamat,
        umur,
        jenisKelamin,
        tanggalLahir
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)
})

/* Endpoint Server */
app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
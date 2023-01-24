const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.post("/ktp", (req,res) => {
    let nama = req.body.nama
    let alamat = req.body.alamat
    let umur = req.body.umur
    let jenisKelamin = req.body.jenisKelamin
    let tanggalLahir = req.body.tanggalLahir

    let response = {
        nama,
        alamat,
        umur,
        jenisKelamin,
        tanggalLahir
    }

    res.json(response)
})


app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
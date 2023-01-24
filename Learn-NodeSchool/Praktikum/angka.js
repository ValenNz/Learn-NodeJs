/* Import Library */
const bodyParser = require("body-parser") // -> Mengambil data dari form pada express
const express = require('express')        // -> Memanggil express
const cors = require("cors")              // -> Mengamankan url pada postman (tidak dapat di acc orang lain)

const app = express() // Definisi router untuk middleware

app.use(bodyParser.json())                          // Extrack data request berformat JSON
app.use(bodyParser.urlencoded({extended: true}))    // Convert car / string ke format url yang valid
app.use(cors())    

/* Endpoint Converter Decimal */
app.post("/decimal", (req,res) => {

    /* Menangkap request dari body */
    let decimal = Number(req.body.decimal)

    /* Mem buat converter dari request yang dikirim */
    let biner = decimal.toString(2) // toString(2) converter berbasis (biner : 1 / 0) 
    let octal = decimal.toString(8) // toString(8) converter berbasi (octal : 8 )
    let hexa = decimal.toString(16) // toString(16) converter berbasis (hexa : 16)

    /* Membuat response yang akan dikirimkan */
    let response = {
        decimal,
        result: {
            biner,
            octal,
            hexa
        }
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)

})

/* Endpoint Converter Biner */
app.post("/biner", (req,res) => {
    /* Menangkap request dari body */
    let biner = Number(req.body.biner)

    /* Membuat converter dari request yang dikirim */
    let decimal = parseInt(biner,2) // Melakukan conver ke biner (berbasi 2)
    let octal = parseInt(biner, 2).toString(8) // melakukan converter ke biner (berbasis 2) lalu fi convert ke octal
    let hexa = parseInt(biner, 2).toString(16) // melakukan converter ke biner (berbasis 2) lalu fi convert ke hexa

    /* Membuat response yang akan dikirimkan */
    let response = {
        decimal : decimal,
        octal : octal,
        hexa : hexa
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)

})

/* Endpoint Converter Octal */
app.post("/octal", (req,res) => {
    /* Menangkap request dari body */
    let octal = Number(req.body.octal)

    /* Membuat converter dari request yang dikirim */
    let decimal = parseInt(octal, 8) // Melakukan conver ke octal (berbasi 8)
    let biner = parseInt(octal, 8).toString(2) // Melakukan conver ke octal (berbasi 8) lalu convert ke biner (berbasis 2)
    let hexa = parseInt(octal, 8).toString(16) // Melakukan conver ke octal (berbasi 8) lalu convert ke hexa (berbasis 16)

    /* Membuat response yang akan dikirimkan */
    let response = {
        decimal : decimal,
        biner : biner,
        hexa : hexa
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)

})

/* Endpoint Converter Hexadecimal */
app.post("/hexa", (req,res) => {
    /* Menangkap request dari body */
    let hexa = Number(req.body.hexa)

    /* Membuat converter dari request yang dikirim */
    let decimal = parseInt(hexa, 16); // Melakukan conver ke hexa (berbasi 16)
    let octal = parseInt(hexa, 16).toString(8); // Melakukan conver ke octal (berbasi 8) lalu convert ke octal (berbasis 8)
    let biner = parseInt(hexa, 16).toString(2); // Melakukan conver ke octal (berbasi 8) lalu convert ke biner (berbasis 2)

    /* Membuat response yang akan dikirimkan */
    let response = {
        decimal : decimal,
        octal : octal,
        biner : biner
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)

})

/* Endpoint Server */
app.listen(8000, () => {
    console.log("Server dijalankan pada port 8000");
})
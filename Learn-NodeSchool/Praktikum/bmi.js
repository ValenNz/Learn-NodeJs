/* Import Library */
const bodyParser = require("body-parser") // -> Mengambil data dari form pada express
const express = require('express')        // -> Memanggil express
const cors = require("cors")              // -> Mengamankan url pada postman (tidak dapat di acc orang lain)

const app = express() // Definisi router untuk middleware

app.use(bodyParser.json())                          // Extrack data request berformat JSON
app.use(bodyParser.urlencoded({extended: true}))    // Convert car / string ke format url yang valid
app.use(cors())                                     // Melakukan pengamanan web

/* Endpoint BMI */
app.post("/bmi", (req,res) => {

   /* Menangkap request dari body */
    let berat = req.body.berat
    let tinggi = req.body.tinggi
    let status = " " 

    /* Membuat rumus dari req yang ditangkap */
    let bmi = berat / (tinggi * tinggi)

    /* Melakukan seleksi kondisi untuk kepastian */
    if(bmi < 18.5 ) {
        status = "Kekurangan berat badan"
    } else if (bmi >= 18.5 && bmi <= 24.9 ) {
        status = "Normal (ideal)"
    } else if (bmi >= 25.0 && bmi <= 29.9 ) {
        status = "Kelebihan berat badan"
    } else if (bmi >= 30) {
        status = "kelebihan berat badan"
    } else {
        status = "Nilai yang anda masukan tidak sesuai"
    }

    /* Membuat response yang akan dikirimkan */
    let response = {
        tinggi, 
        berat,
        result: {
            bmi,
            status
        }
    }

    /* Melakuklan convert response supaya berbentuk json */
    res.json(response)
})

/* Endpoint Server */
app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
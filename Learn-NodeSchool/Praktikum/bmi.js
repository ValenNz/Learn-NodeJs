const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.post("/bmi", (req,res) => {
    let berat = req.body.berat
    let tinggi = req.body.tinggi
    let status = " " 

    let bmi = berat / (tinggi * tinggi)

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

    let response = {
        tinggi, 
        berat,
        bmi,
        status
    }

    res.json(response)

})




app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.get("/convert/celcius/:suhu", (req,res) => { // get untuk mengambil dari url convert/celcius/params
    /* Menginisialisasi : Nangkap params / object -> req */
    let celcius = Number(req.params.suhu) // Number() : Mengkonversi kedalam angka 
    
    /* Deklarasi rumus */
    let reamur = celcius * (4 / 5)
    let kelvin = celcius + 273
    let farenhait = celcius * (9 / 5) + 32
    
    /* Object (varibel)  response -> Untuk mer*/
    let response = {
        celcius,
            result : {
                reamur,
                kelvin,
                farenhait
            }
    }
    /* Mengirim response dari rumus yang dibuat dalam bentuk JSON() */
    res.json(response)
})

app.get("/convert/reamur/:suhu", (req,res) => {
    let reamur = Number(req.params.suhu)

    let celcius = reamur * (5 / 4)
    let farenhait = reamur * ( 9 / 4) + 32
    let kelvin = reamur * (5/4) + 273

    let response = {
        reamur,
            result : {
                celcius,
                farenhait,
                kelvin
            }
    }

    res.json(response)

})

app.get("/convert/kelvin/:suhu", (req,res) => {
    let kelvin = Number(req.params.suhu)

    let celcius = kelvin - 273
    let reamur = (4/5) * (kelvin - 273)    
    let farenhait = (9/5) * (kelvin - 273 ) + 32


    let response = {
        kelvin,
            result : {
                celcius,
                farenhait,
                reamur
            }
    }

    res.json(response)
})

app.get("/convert/farenhait/:suhu", (req,res) => {
    let farenhait = Number(req.params.suhu)

    let celcius = (5/9) * (farenhait - 32)
    let reamur = (4/9) * (farenhait - 32)    
    let kelvin = (5/9) * (farenhait - 32) + 273 


    let response = {
        farenhait,
            result : {
                celcius,
                reamur,
                kelvin
            }
    }

    res.json(response)
})



app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
/* File Connection to Node Modul */
const express = require("express")          // call library ecpress
const bodyParser = require("body-parser")   // call library body-parse
const cors = require("cors")                // call library cors
const app = express()                       // implements express supaya daopat digunakan supaya tidak dapat diakses oleh orang lain (localhost:8000)


/* Use Modul Import */
/* Use Body Parser */
app.use(bodyParser.json()) // Extrack data req berformat JSON

/* Converter  */
app.use(bodyParser.urlencoded({extended: true})) // Untuk mengkonvert karakter atau string ke dalam bentuk format karakter URL yang valid

/* CORS */
app.use(cors()) // cors() protokol penghubung antara browser dan web-service yang memberitahu browser bahwa itu adalah "OK" untuk mengeksekusi kode 

/* Router (endpoint) GET */
app.get("/test", (req,res) => { //  Mengambil dari url (FN arrow)
    /* 
        app         : Router 
        get         : Method get (dari url)
        "/test"     : url 
        (req,res)   : callback32
        req         : var yang berisi data request
        res         : var yang berisi data response dari end-point 
    */

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {                            // make var response
        message: "Ini end-point pertama ku",    // Mengirim pesan ketika diresponse
        method: req.method,                     // Mengirim method yang di req
        code: res.statusCode                    // menampilkan status (200, 400, 404 dll)
    }

    /* Send Response */
    res.json(response) // Memberikan res berformat JSON
})

/* Router (endpoint) GET */
app.get("/profil/:name/:age", (req,res) => { //  Mengambil dari url : "/profil/nama/umur" (FN arrow)
    /* 
        app         : Router 
        get         : Method get (dari url)
        url         : /profil/nama/umur 
        (req,res)   : callback
        req         : var yang berisi data request
        res         : var yang berisi data response dari end-point 
            -   :name dan :age diberikan titik dua didepan menunjukkan "name" dan "age" 
            -   bersifat dinamis yang dapat diganti nilai nya saat melakukan request
    */
    
    /* Menampung Data (var) */
    let name = req.params.name  // mengambil nilai pada parameter name
    let age = req.params.age    // mengambil nilai pada parameter age

    /* Make Object Fill Data for Response */
    let response = {
        nama: name,   // res berisi nama sesuai param
        umur: age     // res berisi umur sesuai paran
    }

    /* Send Response */
    res.json(response)  // Memberikan res berformat JSON

})


/* Router (endpoint) GET */
// end-point "/bujur_sangkar" dengan method POST
app.post("/bujur_sangkar", (req,res) => { //  Mengambil tanpa dari url (FN arrow)
    /* 
        app         : Router 
        post        : Method post 
        url         : /bujur_sangkar
        (req,res)   : callback
        req         : var yang berisi data request
        res         : var yang berisi data response dari end-point 
    */
    /* Menampung Data (var) and Convert to Numeric */ 
    let panjang = Number(req.body.panjang) // mengambil nilai panjang dari body
    let lebar = Number(req.body.lebar)      // mengamil nilai lebar dari body

    /* Make Rumus LUAS and Keliling */
    let luas = panjang * lebar
    let keliling = 2 * (panjang + lebar)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        // res berisi field (var) sesuai param
        panjang: panjang,
        lebar: lebar,
        luas: luas,
        keliling: keliling
    }

    /* Send Response */
    res.json(response) // Memberikan res berformat JSON
})




/* Route (endpoint) Port */
app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})





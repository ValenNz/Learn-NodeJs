/* Menggunakan MODUl (NPM) */
const express = require("express")          // Import file express    
const bodyParser = require("body-parser")   // Import body-parser (mendapatkan form)
const cors = require("cors")                // Menghubungkan broweser ke web-service
const db = require("../config")             //import konfigurasi database
const md5 = require("md5")                  //mengubah password menjadi format md5
const Cryptr = require("cryptr")
const crypt = new Cryptr("140533602676")    //secret key, boleh diganti :)

const app = express()                               // Membuat app (menjalankan express)
app.use(cors())                                     // Menggunkan express
app.use(bodyParser.json())                          // Menerima form (data) dalam bentuk JSON
app.use(bodyParser.urlencoded({extended: true}))    //  Ndak paham

/* Router (endpoint) Register */
app.post("/register", (req,res) => {
    /* Menagkap data yang dikirim body */
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password)
    }
    /* Membuat sql untuk insert data */
    let sql = "insert into user set ?"

    /* Menjalankan  Query */
    db.query(sql, data, (error, result) => {
        let response = null         // Menggirim response null
        if (error) {                // Jika error tampilkan error
            response = {
                message: error.message
            }
        } else {                    // Jika berhasil tampilkan data + user 
            response = {
                message: result.affectedRows + " User berhasil refristasi"
            }
        }
        res.json(response) // send response
    })
})

/* Router (endpoint) Login */
app.post("/login", (req, res) => {
    /* Menampung data yang dikirim di param */
    let param = [
        req.body.username, //username
        md5(req.body.password) // password
    ]
    
    /* Membuat sql untuk insert data */
    let sql = "select * from user where username = ? and password = ?"

    /* Menjalankan Query */
    db.query(sql, param, (error, result) => {
        if (error) throw error  // Jika error tendang error

        /* Chek data hasil jumlah quey */
        if (result.length > 0) {        // jika hasil lebih dari 0 (user tersedia)
            /* Response berbentuk JSON */
            res.json({  
                message: "Logged",                          // Logged (login)
                token: crypt.encrypt(result[0].id_user),    // generate token
                data: result                                // Tampilkan Data
            })
        } else { // jika user tidak ada
            res.json({
                message: "Invalid username/password" // tampilkan pesan 
            })
        }
    })
})


module.exports = app        // export router supaya dapat diakses diserver.js

const express = require("express")          // Import express from library 
const bodyParser = require("body-parser")   // Import bodyPharse (mengambil data dari form)
const cors = require("cors")                // Menghubungkan broweser ke web-service
const db = require("../config")             // Import konfigurasi database   

const app = express()                               // Membuat app (menjalankan express)
app.use(cors())                                     // Menggunkan express
app.use(bodyParser.json())                          // Menerima form (data) dalam bentuk JSON
app.use(bodyParser.urlencoded({extended: true}))    //  Ndak paham


/* Create */
app.post("/", (req,res) => {

    let data = {
        nama_jurusan: req.body.nama_jurusan,
        kepanjangan: req.body.kepanjangan,
        keterangan: req.body.keterangan,
    }

    let sql = "insert into jurusan set ?"

    db.query(sql, data,(error, result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
                }
            } else {
            response = {
                message: result.affectedRows + "Data berhasil masuk"
            }
        }
        res.json(response)
    })
})

/* Read */
app.get("/", (req, res) => {
    let sql = "select * from jurusan"

    db.query(sql, (error, result) => {  
        let response = null     // Mengirimkan response null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                jurusan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

/* Read Detail */
app.get("/:id", (req,res) => {
    let data = {
        id_jurusan: req.params.id // Menangkap req dari body yang dikirim
    }
    let sql = "select * from jurusan where ?" // Menampilkan semua jurusan berdasarkan id

    /* Menjalankan query */
    db.query(sql, data, (error, result) => {
        let response = null     // Mengirimkan response null
        if (error) {                   // Jika error
            response = {    
                message: error.message // pesan error
            }            
        } else {                      // Jika tidak error tampilkan
            response = {
                count: result.length, // jumlah data
                jurusan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

/* Router UPDATE */
app.put("/:id", (req,res) => {

    /* Menangkap Data */
    let data = [
        /* Menangkap data yang dikirim oleh body (postman) */
        {
            nama_jurusan: req.body.nama_jurusan,
            kepanjangan: req.body.kepanjangan,
            keterangan: req.body.keterangan,
        },
        {
            id_jurusan: req.params.id // Menangkap parameter dari primary key
        }
    ]
    let sql = "update jurusan set ? where ?" // Melakukan update ke sql

    /* Menjalankan query */
    db.query(sql, data, (error, result) => {
        let response = null         // Menanpilkan response null (set null)
        if (error) {                // Jika error tampilkan pesan
            response = {
                message: error.message
            }
        } else {                    // Jika tidak error tampilkan data + "Data update"
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response) // send response
    })
})

/* Router DELETE */
app.delete(":id", (req,res) => {
    /* Menangkap data yang dikirim */
    let data = {
        id_jurusan: req.params.id
    }
    let sql = "delete from jurusan where ?" // Menghapus data dari sql

    /* Menjalankan Query */
    db.query(sql, data, (error, result) => {
        let response = null         // Mengirim response null
        if (error) {                // jika error tampilkan pesan error
            response = {
                message: error.message
            }
        } else {                    // Jika tidak error tampilkan data + "data Deleted"
            response = {
                message: result.affectedRows + "Data Berhasil Dihapus"
            }
        }
        res.json(response) // send response
    })
})

module.exports = app // Expotr supaya dapat diacc di server.js

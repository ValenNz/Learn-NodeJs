const express = require("express")          // Import express from library 
const bodyParser = require("body-parser")   // Import bodyPharse (mengambil data dari form)
const cors = require("cors")                // Menghubungkan broweser ke web-service
const db = require("../config")             // Import konfigurasi database   

const app = express()                               // Membuat app (menjalankan express)
app.use(cors())                                     // Menggunkan express
app.use(bodyParser.json())                          // Menerima form (data) dalam bentuk JSON
app.use(bodyParser.urlencoded({extended: true}))    //  Ndak paham


/* Route Create */
app.post("/", (req,res) => {

    /* Menyiapkan Data */
    let data = {
        /* mendapatkan request dari body yang dikirim */
        nis: req.body.nis,                 
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
    }
    let sql = "insert into siswa set ?" // Melakukan Insert ke dalam database

    /* Melakukan response */
    db.query(sql, data, (error, result) => {
        let response = null                     // Mengisikan response dengan null
        if (error) {                            // Jika error tampilkan response error
            response = {
                message: error.message
            }
        } else {                                // Jika tidak error tampilkan data dan message data inserte
            response = {
                message: result.affectedRows + "Data berhasil ditambahkan"
            }
        }
        res.json(response)                      // Kirim response berbentuk JSON
    })
})

/* Router READ */
app.get("/", (req, res) => {
    let sql = "select * from siswa" // Menampilkan semua isi data siswa dari sql

    /* Menjalankan query */
    db.query(sql, (error, result) => {  
        let response = null     // Mengirimkan response null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

/* Router READ By Id */
app.get("/:id", (req, res) => { 
    let data = {
        id_siswa: req.params.id // Menangkap req dari body yang dikirim
    }
    let sql = "select * from siswa where ?" // Menampilkan semua siswa berdasarkan id

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
                siswa: result // isi data
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
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
        },
        {
            id_siswa: req.params.id // Menangkap parameter dari primary key
        }
    ]
    let sql = "update siswa set ? where ?" // Melakukan update ke sql

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
app.delete("/siswa/:id", (req,res) => {
    /* Menangkap data yang dikirim */
    let data = {
        id_siswa: req.params.id
    }
    let sql = "delete from siswa where ?" // Menghapus data dari sql

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

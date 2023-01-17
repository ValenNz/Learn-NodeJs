
const express = require("express")          // Import file express
const bodyParser = require("body-parser")   // Import bodyPharse (mengambil data dari form)
const cors = require("cors")                // import file cors
const db = require("../config")             // import konfigurasi database
const multer = require("multer")            // untuk upload file
const path = require("path")                // untuk memanggil path direktori
const fs = require("fs")                    // untuk manajemen file

const app = express()                           // Membuat app (menjalankan express)
app.use(cors())                                 // Menghubungkan broweser ke web-service
app.use(express.json())                         // Menggunakan expreess dalam bentuk json
app.use(express.urlencoded({extended: true}))   // TDK PAHAM
app.use(express.static(__dirname));             // Menggunak penyimpanan foto 

/* Make Function Storage */
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './router/image/foto_guru'); // Letak dari foto disimpan
    },
    filename: (req, file, cb) => {          // ndak paham
        // generate file name 
        cb(null, "guru-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

// end-point akses data guru
app.get("/", (req, res) => {
    // create sql query
    let sql = "select * from guru"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                guru: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data guru berdasarkan id_guru tertentu
app.get("/:id", (req, res) => {
    let data = {
        id_guru: req.params.id
    }
    // create sql query
    let sql = "select * from guru where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                guru: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data guru
app.post("/", upload.single("foto"), (req,res) => {

    // prepare data
    let data = {
        nip: req.body.nip,
        nama_guru: req.body.nama_guru,
        tgl_lahir: req.body.tgl_lahir,
        alamat: req.body.alamat,
        foto: req.file.filename
    }

    if (!req.file) {
        // jika tidak ada file yang diupload
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        // create sql insert
        let sql = "insert into guru set ?"

        // run query
        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data inserted"
            })
        })
    }
})


// end-point mengubah data guru
app.put("/:id", upload.single("foto"), (req,res) => {
    let data = null, sql = null
    // paramter perubahan data
    let param = {
        id_guru: req.params.id
    }

    if (!req.file) {
        // jika tidak ada file yang dikirim = update data saja
        data = {
            nip: req.body.nip,
            nama_guru: req.body.nama_guru,
            tgl_lahir: req.body.tgl_lahir,
            alamat: req.body.alamat
        }
    } else {
        // jika mengirim file = update data + reupload
        data = {
            nip: req.body.nip,
            nama_guru: req.body.nama_guru,
            tgl_lahir: req.body.tgl_lahir,
            alamat: req.body.alamat,
            foto: req.file.filename
        }

        // get data yg akan diupdate utk mendapatkan nama file yang lama
        sql = "select * from guru where ?"
        // run query
        db.query(sql, param, (err, result) => {
            if (err) throw err
            // tampung nama file yang lama
            let fileName = result[0].foto

            // hapus file yg lama
            let dir = path.join(__dirname,"image/foto_guru",fileName)
            fs.unlink(dir, (error) => {})
        })

    }

    // create sql update
    sql = "update guru set ? where ?"

    // run sql update
    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data updated"
            })
        }
    })
})

// end-point menghapus data guru berdasarkan id_guru
app.delete("/:id", (req,res) => {
    let param = {
        id_guru: req.params.id
    }

    // ambil data yang akan dihapus
    let sql = "select * from guru where ?"
    // run query
    db.query(sql, param, (error, result) => {
        if (error) throw error
        
        // tampung nama file yang lama
        let fileName = result[0].foto

        // hapus file yg lama
        let dir = path.join(__dirname,"image/foto_guru",fileName)
        fs.unlink(dir, (error) => {})
    })

    // create sql delete
    sql = "delete from guru where ?"

    // run query
    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data deleted"
            })
        }      
    })
})



module.exports = app // Melakukan exports supaya dapat diakses di file server.js

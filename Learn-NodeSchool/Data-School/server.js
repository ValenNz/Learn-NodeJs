/* File Router (endpoint) => server */
const express = require("express")          // call library ecpress
const app = express()                       // implements express supaya daopat digunakan
const Cryptr = require("cryptr")            // encrypt
const crypt = new Cryptr("140533602676")    // make cryptr
const db = require("./config")              // Connetion to db

/* Import Router User */
const user = require("./router/user")
app.use("/", user)

/* Validasi Token */
validateToken = () => {
    return (req, res, next) => {
        /* cek keberadaan "Token" pada request header */
        if (!req.get("Token")) {
            /* jika Token tidak ada */
            res.json({
                message: "Access Forbidden"
            })
        } else {
            let token  = req.get("Token") // dapatkan token
            let decryptToken = crypt.decrypt(token) // decrypt token menjadi id_user
            let sql = "select * from user where ?" // check id_user sql
            let param = { id_user: decryptToken} // set param for res

            /* Run query */
            db.query(sql, param, (error, result) => {
                if (error) throw error // jika error -> kirim error
                 /* Check id user */
                if (result.length > 0) { // jika hasil lebih dari 0 maka lanjutkan method selanjutnya
                    
                    next() // jika id_user tersedia melanjutkan method selanjutnya
                } else {
                    /* jika user tidak tersedia */
                    res.json({
                        message: "Invalid Token"
                    })
                }
            })
        }

    }
}

/* Import Router */
const siswa = require("./router/siswa") // memanggil router siswa
app.use("/siswa", validateToken(), siswa) // use router with validate

// //import route jurusan
// const jurusan = require("./router/jurusan")
// app.use("/jurusan", validateToken(), jurusan)

const pelanggaran_siswa = require("./router/pelanggaran_siswa") // memanggil router pelanggaran_siswa
app.use("/pelanggaran_siswa",validateToken(), pelanggaran_siswa) // use router with validate

const guru = require("./router/guru") // memanggil router guru
app.use("/guru", validateToken(), guru)

/* membuat web server dengan port 8000 */
app.listen(8000, () => {
    console.log("server run on port 8000")
})

const express = require('express') // import modul di samakan var express
const app = express()              // Make var untuk manggil function express
const port = 3000                  // Make port (url)
const bodyParser = require('body-parser')  // import modul di samakan var bodyParser
const db = require('./connection') // conection ke database
const response = require("./response")

app.use(bodyParser.json()) // mengambil format dari frontend dari post method ke json 

/* Router HOME (endpoint) | GET */
app.get("/", (req,res) => { // Method Get (callback) arrow fn
  response(200, "API v1 ready to go", "SUCCESS", res)
})

/* Router READ (endpoint) | GET */
app.get("/mahasiswa", (req,res) => { // Method Get (callback) arrow fn
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (err, fields) => {
    if(err) throw err
    // console.log(fields)
    response(200, fields,"list mahasiswa muncul", res)
  })
})

/* Router DETAIL (endpoint) | GET */
app.get("/mahasiswa/:nim", (req,res) => { // Method Get (callback) arrow fn
  const nim = req.params.nim
  const sql  = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err,fields) => {
    // console.log(fields)
    if(err) throw err
    response(200, fields, "get detail mahasiswa", res)

  })
})

/* Route Create */
app.post("/mahasiswa", (req,res) => {
  const {nim, nama_mahasiswa,kelas, alamat} = req.body
  const sql = `INSERT INTO mahasiswa (nim, nama_mahasiswa, kelas, alamat) VALUES (${nim}, '${nama_mahasiswa}', '${kelas}', '${alamat}')`
  db.query(sql, (err, fields) => {
    if(err) response(500, "INVALID", "error", res)
    if(fields?.affectedRows) { // jika ada field eksekusi ini jika tidak eksekusi berikutnya
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, "Insert Data", res)
    } 
  }) 
})

/* Route Update */
app.put("/mahasiswa", (req, res) => {
  const {nim, nama_mahasiswa, kelas, alamat } = req.body
  const sql =  `UPDATE mahasiswa SET nama_mahasiswa = '${nama_mahasiswa}', kelas = '${kelas}', alamat = '${alamat}', WHERE nim = ${nim}`

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        massage: fields.massage,
      }
      response(200, data, "update data successfull", res)
    } else {
      response(404, "User not found", "error", res)
    }
  })
})

/* Route Delete */
app.delete("/mahasiswa", (req,res) => {
  const { nim } = req.body
  const sql = ` DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err,fields) => {
    if (err) response(500, "invalid", "error", res)

    if (fields?.affectedRows){
      const data = {
        isDeleted: fields.affectedRows,
      }
      response(200, data, "Delete Data Successful", res)
    } else {
      response(404, "user not  found", "error", res)
    }
  })
})


/* Router Port */
app.listen(port, () => {  
  console.log(`Example app listening on port ${port}`)
})
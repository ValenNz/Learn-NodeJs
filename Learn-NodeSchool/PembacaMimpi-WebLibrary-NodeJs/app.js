require('dotenv').config();
const express = require('express');
const app = express();
const anggotaRouter = require("./api/anggota");
const petugasRouter = require("./api/petugas");
const pinjamRouter = require("./api/peminjaman");
const bukuRouter = require("./api/buku");
app.use(express.json());
app.use("/api/anggota", anggotaRouter);
app.use("/api/petugas", petugasRouter);
app.use("/api/pinjam", pinjamRouter)
app.use("/api/buku", bukuRouter)

app.listen(process.env.APP_PORT, ()=>{
    console.log("Tersambung di PORT : " + process.env.APP_PORT)
}) 
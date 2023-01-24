const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/kubus", (req, res) => {
  let sisi = Number(req.body.sisi);
  let volume = sisi * sisi * sisi;
  let luas = 6 * sisi * sisi;
  let response = {
    volume: volume,
    luas: luas,
  };

  res.json(response);
});

app.post("/segitiga", (req, res) => {
  let alas = Number(req.body.alas);
  let tinggi = Number(req.body.tinggi);
  let volume = (1 / 2) * alas * tinggi * tinggi;
  let luas = (1 / 2) * alas * tinggi;
  let response = {
    volume: volume,
    luas: luas,
  };

  res.json(response);
});

app.post("/balok", (req, res) => {
  let panjang = Number(req.body.panjang);
  let lebar = Number(req.body.lebar);
  let tinggi = Number(req.body.tinggi);
  let volume = panjang * lebar * tinggi;
  let luas = 2 * (panjang * lebar + panjang * tinggi + lebar * tinggi);
  let response = {
    volume: volume,
    luas: luas,
  };

  res.json(response);
});

app.post("/bola", (req, res) => {
  let jari = Number(req.body.jari);
  let volume = (4 / 3) * Math.PI * jari * jari * jari;
  let luas = (4 / 3) * Math.PI * jari * jari;
  let response = {
    volume: volume,
    luas: luas,
  };

  res.json(response);
});

app.listen(8000, () => {
  console.log("Server dijalankan pada port 8000");
});
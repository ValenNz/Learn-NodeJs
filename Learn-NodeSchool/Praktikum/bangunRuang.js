/* Import Library */
const bodyParser = require("body-parser"); // -> Mengambil data dari form pada express
const express = require("express");        // -> Memanggil express
const cors = require("cors");              // -> Mengamankan url pada postman (tidak dapat di acc orang lain)

const app = express();  // Definisi router untuk middleware

app.use(bodyParser.json());                         // Extrack data request berformat JSON
app.use(bodyParser.urlencoded({ extended: true })); // Convert car / string ke format url yang valid
app.use(cors());                                    // Melakukan pengamanan web

/* Endpoint Kubus */
app.post("/kubus", (req, res) => {

  /* Menangkap request dari body */
  let sisi = Number(req.body.sisi); 

  /* Membuat rumus dari req yang ditangkap */
  let volume = sisi * sisi * sisi;
  let luas = 6 * sisi * sisi;

  /* Membuat response yang akan dikirimkan */
  let response = {
    sisi,
    result : {
      volume: volume,
      luas: luas,
    }
  }; 

  /* Melakuklan convert response supaya berbentuk json */
  res.json(response);
});

/* Endpoint Balok */
app.post("/balok", (req, res) => {

  /* Menangkap request dari body */
  let panjang = Number(req.body.panjang)
  let lebar = Number(req.body.lebar)
  let tinggi = Number(req.body.tinggi)

  /* Membuat rumus dari req yang ditangkap */
  let volume = panjang * lebar * tinggi
  let luas = 2 * (panjang*lebar + panjang*tinggi + tinggi*lebar)

  /* Membuat response yang akan dikirimkan */
  let response = {
    panjang: panjang,
    lebar: lebar,
    tinggi: tinggi,
    result: {
        volume: volume,
        luas: luas
    }
  }

  /* Melakuklan convert response supaya berbentuk json */
  res.json(response);
});

/* Endpoint Kerucut  */
app.post("/kerucut", (req, res) => {

  /* Menangkap request dari body */
  let jari = Number(req.body.jari);
  let tinggi = Number(req.body.tinggi);
  let rusuk = Number(req.body.rusuk);

  /* Membuat rumus dari req yang ditangkap */
  let luas = (Math.PI * Math.pow(jari, 2)) + (Math.PI * jari *  rusuk )
  let volume = (1/3) * Math.PI * Math.pow(jari, 2) * tinggi

  /* Membuat response yang akan dikirimkan */
  let response = {
    jari,
    tinggi,
    rusuk,
    result : {
      volume,
      luas
    }
  }; 

  /* Melakuklan convert response supaya berbentuk json */
  res.json(response);


});

/* Endpoint Bola */
app.post("/bola", (req, res) => {
    
  /* Menangkap request dari body */
  let jari = Number(req.body.jari);

  /* Membuat rumus dari req yang ditangkap */
  let volume = (4 / 3) * Math.PI * Math.pow(jari, 3);
  let luas = 4 * Math.PI * Math.pow(jari, 2);

  /* Membuat response yang akan dikirimkan */
  let response = {
    jari,
    result : {
      volume,
      luas
    }
  }; 

  /* Melakuklan convert response supaya berbentuk json */
  res.json(response);
});

/* Endpoint Server */
app.listen(8000, () => {
  console.log("Server dijalankan pada port 8000");
});
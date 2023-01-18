const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/decimal", (req,res) => {
    let decimal = Number(req.body.decimal)
    let biner = decimal.toString(2)
    let octal = decimal.toString(8)
    let hexa = decimal.toString(16)
    let response = {
        biner : biner,
        octal : octal,
        hexa : hexa
    }

    res.json(response)

})

app.post("/biner", (req,res) => {
    let biner = Number(req.body.biner)
    let decimal = parseInt(biner,2)
    let octal = parseInt(biner, 2).toString(8)
    let hexa = parseInt(biner, 2).toString(16)
    let response = {
        decimal : decimal,
        octal : octal,
        hexa : hexa
    }

    res.json(response)

})

app.post("/octal", (req,res) => {
    let octal = Number(req.body.octal)
    let decimal = parseInt(octal, 8)
    let biner = parseInt(octal, 8).toString(2)
    let hexa = parseInt(octal, 8).toString(16)
    let response = {
        decimal : decimal,
        biner : biner,
        hexa : hexa
    }

    res.json(response)

})

app.post("/hexa", (req,res) => {
    let hexa = Number(req.body.hexa)
    let decimal = parseInt(hexa, 16);
    let octal = parseInt(hexa, 16).toString(8);
    let biner = parseInt(hexa, 16).toString(2);
    let response = {
        decimal : decimal,
        octal : octal,
        biner : biner
    }

    res.json(response)

})

app.listen(8000, () => {
    console.log("Server dijalankan pada port 8000");
})
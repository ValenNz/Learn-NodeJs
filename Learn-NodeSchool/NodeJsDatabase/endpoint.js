const express = require('express') //import express
const bodyParser = require('body-parser')
const app = express()              //deklarasi variabel express
const port = 8080                  //deklarasi port

app.use(bodyParser.urlencoded({extended:false})) 

app.get('/', (req, res) => {       // endpoint '/'
    res.send("Hello Programers!")  
})

/* Make endpoint */

/* Enpoint CREATE */
app.post('/orang', (req, res)=>{
    var namaOrang = req.body.nama
    var alamat = req.body.alamat
    res.end('Menampilkan orang baru, atas nama: '+namaOrang+', yang beralamat di'+alamat)
})

/* Endpoint UPDATE */
app.put('/orang/:id', (req, res) => {
    var namaOrang = req.body.nama
    var alamat = req.body.alamat 
    var id = req.params.id
    res.end('Seseorang dengan ID'+id+', telah terupdate')
});

/* Endpoint READ */
app.get('/orang/:nama', (req,res)=>{
    var namaOrang = req.params.nama
    res.end('Menampilkan nama siswa:'+namaOrang)
})

/* Endpoint Detail */
app.delete('orang/:id', (req, res) => {
    var id = req.params.id
    var namaOrang = req.body.nama
    res.end('ID'+id+' telah dihapus, atas nama '+namaOrang)
});

/* Make endpoint port */
app.listen(port, () => {            
    console.log(`Server di port ${port}`)
}) 
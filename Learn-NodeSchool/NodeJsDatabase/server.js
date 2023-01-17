/* File untuk menjalankan server */
const express = require('express')  // Import file express 
const app = express()               // Use file express
const port = 8080                   // Make port (8080)

app.set('view engine', 'ejs')       // memuat modul secara internal dalam bentuk .ejs

/* Make Midlleware */
app.get('/', (req, res) => {    
    res.render('index.ejs')
})

/* Menjalankan server */
app.listen(port, () => {
    console.log(`Server di port ${port}`)
}) 
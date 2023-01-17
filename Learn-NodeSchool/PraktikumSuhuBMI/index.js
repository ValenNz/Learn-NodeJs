const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.get("/convert/celcius", (req,res) => {
    let celcius = req.body.celcius
    
    let reamur = celcius * (4 / 5)
    let kelvin = celcius + 273
    let farenhait = celcius * (9 / 5) + 32
    
    let response = {
        celsius: celcius,
            result : {
                reamur: reamur,
                kelvin: kelvin,
                farenhait: farenhait
            }

    }

    res.json(response)

})

app.listen(8000, () => { // Use port 8000
    console.log("Server run on port 8000");
})
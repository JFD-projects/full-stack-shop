require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sequelize = require('./db')
const mainRouter = require("./routes/index")
const cors = require('cors')
const path = require('path');

app.use(bodyParser.json())
app.use(cors())
const assetsPath = path.join(__dirname, './assets');
app.use(express.static(assetsPath))
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use('/api', mainRouter)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
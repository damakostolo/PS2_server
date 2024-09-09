require("dotenv").config();
const express = require('express');
const cors = require('cors');
const router = express.Router();
const sequelize = require('./dbAdmin');
const fileUpload = require('express-fileupload');
const path = require('path');
const models =require('./models/models');

PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}))
app.use("/ps2", router);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    }catch(err) {
        console.error(err);
    }
}

start().then()




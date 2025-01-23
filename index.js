require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./router/index');
const sequelize = require('./dbAdmin');
const fileUpload = require('express-fileupload');
const path = require('path');
const model =require('./models/models');
const errorMiddleware = require('./middlewares/error-middleware')

PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Ваш клиентский домен
    credentials: true, // Разрешает отправку cookies
}));
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/api", router);
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    }catch(err) {
        console.error(err);
    }
}

start().then()




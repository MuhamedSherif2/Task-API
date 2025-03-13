require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Ruotes/User.Ruote')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOO_URL)
    .then(() => console.log('Mongoo DB connect'))
    .catch((error) => console.log(`In Mongoo DB Error : ${error}`))
;

app.use('/' , userRouter)

app.use(function(req , res){
    res.status(404).send({url : `${req.originalUrl} not found`})
})

const port = process.env.PORT // Fallback to port 3000 if PORT is not set
app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes')

const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.json())


app.use('/api/auth', UserRoutes)


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Mongoose Connected')
    }).catch(err =>{
        console.log(`mongoose connect error: `+err)
    })


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
const express = require('express')
const PORT = 3000
const path = require('path')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.listen(PORT, ()=>{
    console.log(`Server runs on PORT: ${PORT}`)
})
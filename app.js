const express = require('express')
const PORT = 3000
const path = require('path')
const app = express();
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://zubalana0:xs2xO7q9rBvKBrdy@root.iqk47mq.mongodb.net/?retryWrites=true&w=majority&appName=root`)
.then(()=>{
    console.log(`Connected to mongo DB`)
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.listen(PORT, ()=>{
    console.log(`Server runs on PORT: ${PORT}`)
})
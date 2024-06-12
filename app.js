const express = require('express')
const PORT = 3000
const path = require('path')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

//database connection 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
const Excuses = mongoose.model('Excuses', {author: String, excuse: String})


//new excuses creating
app.post('/add-excuse', async (req, res) => {
    console.log(req.body)
    try {
        const { author, excuse } = req.body;
        const excuses = new Excuses({ author, excuse });
        await excuses.save();
        console.log(`Excuse created`);
        res.status(201).json(excuses);
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.listen(PORT, ()=>{
    console.log(`Server runs on PORT: ${PORT}`)
})
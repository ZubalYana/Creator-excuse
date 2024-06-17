const express = require('express')
const PORT = 3000
const path = require('path')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

//database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const excuseSchema = new mongoose.Schema({
    author: String,
    excuse: String
});
const Excuses = mongoose.model('Excuses', excuseSchema);

//new excuses creating
app.post('/add-excuse', async (req, res) => {
    console.log(req.body);
    try {
        const { author, excuse } = req.body;
        const excuses = new Excuses({ author, excuse });
        await excuses.save();
        console.log(`Excuse created`);
        res.status(201).json(excuses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get all the excuses
app.get('/excuses', async (req, res)=>{
    try {
        const excuses = await Excuses.find();
        res.json(excuses);
    } catch (err) {
        console.error('Error retrieving excuses:', err);
        res.status(500).json({ message: err.message });
    }
});

//excuses deleting
app.delete('/excuse/:id', async ( req, res )=>{
    try {
        const id = req.params.id;
        console.log(id);
        await Excuses.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

//excuses editing
app.put('/edit-excuse/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const excuse = await Excuses.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(excuse);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin'));
});
app.listen(PORT, () => {
    console.log(`Server runs on PORT: ${PORT}`);
});

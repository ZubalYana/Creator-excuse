const express = require('express')
const PORT = 3000
const path = require('path')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: false });
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    excuse: String,
    rating: { type: Number, default: 0 } 
});
const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const Excuses = mongoose.model('Excuses', excuseSchema);
const Accounts = mongoose.model('Accounts', accountSchema);

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

//account creating
app.post('/create-account', async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;
        const accounts = new Accounts({ name, email, password });
        await accounts.save();
        console.log('Account created');
        res.status(201).json(accounts);
    } catch (err) {
        console.error('Error creating account:', err);
        res.status(500).json({ message: err.message });
    }
});

//get all the accounts
app.get('/accounts', async (req, res)=>{
    try {
        const accounts = await Accounts.find();
        res.json(accounts);
    } catch (err) {
        console.error('Error retrieving accounts:', err);
        res.status(500).json({ message: err.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

const JWT_SECRET = 'your_jwt_secret';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


// Реєстрація користувача
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
});

// Авторизація користувача
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Logged in successfully' });
});

// Вихід користувача (logout)
app.post('/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

app.get('/api/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('username');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user information' });
    }
});
app.get('/', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin'));
});
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.listen(PORT, () => {
    console.log(`Server runs on PORT: ${PORT}`);
});

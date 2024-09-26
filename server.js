const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB (Replace the URL with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [
        {
            productId: String,
            name: String,
            quantity: Number,
            price: Number,
        }
    ],
    total: Number,
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

// Routes

// Sign-up Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    try {
        await user.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Order Placement Route
app.post('/order', async (req, res) => {
    const { userId, products, total } = req.body;
    const order = new Order({ userId, products, total });
    try {
        await order.save();
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error placing order', error: err });
    }
});

// Serve the main index.html file for any unknown routes (fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

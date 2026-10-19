require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/products', require('./routes/products'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Supermarket API is running!' });
});

app.listen(PORT, () => {
  console.log(`🛒 Supermarket server running on port ${PORT}`);
});
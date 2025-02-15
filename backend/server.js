const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const registerRouter = require('./routes/Register');
const loginRouter = require('./routes/Login');
const cartRouter = require('./routes/AddToCard');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors("*"));
app.use('/api', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);



const PORT = 5000;
const MONGO_URI ='mongodb+srv://jeyachandranj:jj.jeyan@cluster0.pe8ib.mongodb.net/booksdb';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.log('MongoDB connection error:', error));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

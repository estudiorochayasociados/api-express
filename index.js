const express = require('express');
const adminRoutes = require('./routes/admin');
const newsRoutes = require('./routes/news');
const productsRoutes = require('./routes/products');
const app = express();

app.use(express.json());

app.listen(process.env.PORT || 3000);

//Routes
app.use('/api/admin',adminRoutes);
app.use('/api/news',newsRoutes);
app.use('/api/products',productsRoutes);

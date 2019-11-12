const express = require('express');
const adminRoutes = require('./routes/admin');
const newsRoutes = require('./routes/news');
const app = express();

app.use(express.json());
app.set('models', require('./models'));

app.listen(process.env.PORT || 3000);

//Routes
app.use('/api/admin',adminRoutes);
app.use('/api/news',newsRoutes);

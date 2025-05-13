const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => res.send("Simple Book API using Node.js and Express"));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


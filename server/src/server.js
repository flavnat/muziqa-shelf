const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.js')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', require('./routes/songRoutes'));

app.get('/test', (req, res) => {
  res.send('Muziqa Shelf API is running!');
});

connectDB().then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

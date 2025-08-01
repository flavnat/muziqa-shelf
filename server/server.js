const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const songRoutes = require('./routes/songRoutes');

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', songRoutes);

// Sync DB
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

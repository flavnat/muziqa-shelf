const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.js')
const verifyJwt = require('./middlewares/verifyJWT.js')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use('/', require('./routes/registerRoute.js'))

app.use('/', require('./routes/authRoute.js'))

app.use('/', require('./routes/refreshTokenRoute.js'))
app.use('/', require('./routes/logoutRoute.js'))

app.use('/', require('./routes/songRoutes'));


app.get('/test', verifyJwt, (req, res) => {
  res.json({ message: 'Test OK', userId: req.userId, username: req.username });
});



// Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
});


connectDB().then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

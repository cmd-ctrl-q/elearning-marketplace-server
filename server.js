import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs'; // file system
import mongoose from 'mongoose';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const morgan = require('morgan');
require('dotenv').config(); // load env

const csrfProtection = new csrf({ cookie: true });

const app = express();

// db connection
mongoose
  .connect('mongodb://127.0.0.1:27017/edemy')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database connection failed: ', err);
    process.exit(1);
  });

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(csrfProtection);

// routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

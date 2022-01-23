import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('some random middleware');
  next();
});

// routes
app.get('/', (req, res) => {
  res.send('you hit endpoint');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
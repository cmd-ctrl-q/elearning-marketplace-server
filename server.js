import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs'; // file system
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
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
  res.send("Welcome to Tanmay's Blogpost!!");
});
//tutorial method of connecting
//const CONNECTION_URL = "mongodb+srv://tanmaysutar:hansipansi21@cluster0.6zida.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 1111;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);


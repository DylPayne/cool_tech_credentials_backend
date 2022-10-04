// https://medium.com/@vrinmkansal/quickstart-jwt-based-login-for-react-express-app-eebf4ea9cfe8
// Above used for information on JWT in full stack apps

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.routes');
const credentialRouter = require('./routes/credentials.routes');
require('dotenv').config(); //read environment variables
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.port || 3000;

mongoose.connect(
  'mongodb+srv://dylpayne:16Fernhill@dylanpayne.jo7qprz.mongodb.net/cool_tech?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(userRouter);
app.use(credentialRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT} `);
});

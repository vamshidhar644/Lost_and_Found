require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const all_itemRoutes = require('./routes/all_items');
const itemTypeRoutes = require('./routes/itemType');
// Express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/items', itemRoutes);
app.use('/api/user', userRoutes);
app.use('/api/all_items', all_itemRoutes);
app.use('/api/itemTypes', itemTypeRoutes);

mongoose.set('strictQuery', false);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for request

    app.listen(process.env.PORT, () => {
      console.log('Connected to DB Listening on port ', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;

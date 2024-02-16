const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/productmodel');
const App = express();
require('dotenv').config();


App.use(express.json());

App.listen(3000, () => {
    console.log("Server is running at 3000");
});

App.get("/", (req, res) => {
    res.send("hello ");
});

// POST Operation**Data from Browser
App.get('/product', async (req, res) => {
    try {
        const data = {
            name: String(req.query.name),
            quantity: Number(req.query.quantity)
        };

        const product = await Product.create(data);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET All Operation
App.get('/view', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET By ID Operation
App.get('/view/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    App.listen(process.env.Port, () => {
      console.log('Node API is running on port 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/notes', (req, res) => {
    res.json([]);
});

app.post('/notes', (req, res) => {
    res.status(201).json({ id: 1, ...req.body });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

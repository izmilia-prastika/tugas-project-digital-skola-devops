const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const { title, body } = req.body;
    const newNote = { id: notes.length + 1, title, body };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

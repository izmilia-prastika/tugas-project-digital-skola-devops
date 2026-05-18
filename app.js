const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let notes = [
  { id: 1, title: 'Belajar DevOps', body: 'Selesaikan tugas CI/CD' },
  { id: 2, title: 'Belajar k6', body: 'Load testing dengan k6' }
];

// Health check / root endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Notes API is running' });
});

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// POST new note
app.post('/notes', (req, res) => {
  const { title, body } = req.body;
  const newNote = {
    id: notes.length + 1,
    title: title || 'untitled',
    body: body || ''
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// GET note by id
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// DELETE note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Only start server if not in test environment
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

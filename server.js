const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares for parsing JSON and urlencoded data and for serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Function to read and write to the db.json file
const readAndWriteToFile = (data, res) => {
  fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(data), err => {
    if (err) {
      return res.status(500).json({ error: "Error writing to file" });
    }
    res.json(data);
  });
};

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// API Routes
// GET Request - Reading the db.json file and returning all saved notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading from file" });
    }
    res.json(JSON.parse(data));
  });
});

// POST Request - Receiving a new note, saving it to db.json, and returning it
app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };

  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading from file" });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);
    readAndWriteToFile(notes, res);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

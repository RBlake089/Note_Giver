const express = require('express');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const fs = require("fs");


const PORT = process.env.PORT || 3001

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Public directory, accessible to client
app.use(express.static('public'));

// Defines a route that will serve the index.html file when a user visits the root path of the app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Defines a route that will serve the notes.html file when a user visits the root path of the app
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
});
app.post('/api/notes', (req, res) => {
    const dbData = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    const newNotes = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbData.push(newNotes);
    fs.writeFileSync('./db/db.json',JSON.stringify(dbData));
    res.json(dbData);
  });
  
  
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.static('public'));
app.use(express.json());
var dbraw = fs.readFileSync('./db/db.json');
var dbjson = JSON.parse(dbraw);

//write data to db
function saveDb()
{
  fs.writeFileSync('./db/db.json', JSON.stringify(dbjson));
}

function saveNote(note)
{
  dbjson.push(note);
  saveDb();
}

//get notes page
app.get('/notes', (req, res) =>
{
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//get notes
app.get('/api/notes', (req, res) =>
{
  let notes = JSON.stringify(dbjson);
  res.send(notes);
});

//wildcard get
app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

//post notes
app.post('/api/notes', (req, res) =>
{
  saveNote(req.body);
  res.end();
});

app.listen(port, () =>
{
  console.log(`App listening on port ${port}`);
});
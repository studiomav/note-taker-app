const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();
const path = require('path');
const { delimiter } = require('path');
const port = process.env.PORT || 80;

app.use(express.static('public'));
app.use(express.json());
var dbraw = fs.readFileSync('./db/db.json');
var dbjson = JSON.parse(dbraw);

//write data to db
function saveDb()
{
  fs.writeFileSync('./db/db.json', JSON.stringify(dbjson));
}

//saves new note to the json db
function saveNote(note)
{
  note.id = uuidv4();
  dbjson.push(note);
  saveDb();
}

//deletes a note from the json db
function delNote(delId)
{
  console.log(dbjson);
  dbjson = dbjson.filter(element => element.id != delId);
  console.log(dbjson);
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

app.delete('/api/notes/*', (req, res) =>
{
  const delId = req.params[0];
  console.log(`We got a delete request for ${delId}, running deletion now`);
  delNote(delId);
  res.end();
});

app.listen(port, () =>
{
  console.log(`App listening on port ${port}`);
});
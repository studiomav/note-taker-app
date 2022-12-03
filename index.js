const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) =>
{
  res.send('Hello World!');
});

app.get('/notes', (req, res) =>
{
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(port, () =>
{
  console.log(`Example app listening on port ${port}`);
});
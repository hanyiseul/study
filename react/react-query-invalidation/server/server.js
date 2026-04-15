const express = require('express');
const path = require('path');

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

let users = [
  { id: 1, name: '김민수' },
  { id: 2, name: '이서연' }
];

app.get('/api/users', function (req, res) {
  res.json(users);
});

app.post('/api/users', function (req, res) {
  const newUser = {
    id: Date.now(),
    name: req.body.name
  };

  users.push(newUser);

  res.json(newUser);
});

app.get('/*rest', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, function () {
  console.log('server running on port ' + PORT);
});
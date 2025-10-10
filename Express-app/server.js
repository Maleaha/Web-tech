const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {
  res.send('Contact me at: ');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

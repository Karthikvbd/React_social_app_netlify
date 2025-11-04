const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

const PORT = process.env.PORT || 3501;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


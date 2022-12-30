'use strict';

const express = require('express');
var router = express.Router();
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


router.get('/', (req, res) => {
  res.send('Users!');
});

// app.listen(PORT, HOST, () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
// });

module.exports = router;
'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.listen(PORT, () => {
  console.log('server up on port 3000');
});

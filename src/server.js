const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/FOOD-MANIA'));

app.get('/*',(req, res) => 
    res.sendFile('index.html', {root: 'dist/FOOD-MANIA'}),
);

app.listen(process.env.PORT || 8080);

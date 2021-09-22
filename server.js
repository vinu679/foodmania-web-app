const express = require('express');
const path = require('path');

const app = express();

function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.use(requireHTTPS);
app.use(express.static('./dist/food-mania'));

app.get('/*',(req, res) => 
    res.sendFile('index.html', {root: 'dist/food-mania'}),
);

app.listen(process.env.PORT || 8080);

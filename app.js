const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.writeHead(404));

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/', require('./router/logoRouter'));
app.use('/menu', require('./router/menuRouter'));

app.listen(3000);
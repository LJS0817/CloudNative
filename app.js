const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const redisClient = require(path.resolve(__dirname, '../common-assets/redis.js'))
const RedisStore = require('connect-redis'); // connect-redis v7+

const redisStore = new RedisStore.RedisStore({
    client: redisClient,
    prefix: 'myapp:session:', // Redis에 저장될 키(key)의 접두사
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.writeHead(404));

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));


app.use(
  session({
    store: redisStore, // (★) 세션 저장소를 Redis로 지정
    secret: 'super_secret_key_123', // 쿠키 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // (https 사용 시 true)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1일
    }
  })
);


app.use('/', require('./router/logoRouter'));
app.use('/menu', require('./router/menuRouter'));
app.use('/discover', require('./router/discoverRouter'));
app.use('/join', require('./router/joinRouter'));
app.use('/create', require('./router/createRouter'));

app.listen(3000);
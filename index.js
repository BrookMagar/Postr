const express = require("express"),
  session = require("cookie-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  Sequelize = require("sequelize"),
  sqlite = require("sqlite3");
  const handlebars = require("express-handlebars").create({
    defaultLayout: "main"
  });

const models = require("./models");

const app = express();

app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

const users = require("./routes/users");
const posts = require("./routes/posts");

app.get('/', (request, response) => {
  response.render('login');
});
app.get('/account_created', (request, response) => {
  response.render('account_created');
});
app.get('/board', (request, response) => {
  response.render('board');
});
app.get('/create_post', (request, response) => {
  response.render('create_post');
});
app.get('/login', (request, response) => {
  response.render('login');
});
app.get('/logout', (request, response) => {
  response.render('logout');
});
app.get('/notloggedin', (request, response) => {
  response.render('notloggedin');
});
app.get('/signup', (request, response) => {
  response.render('signup');
});
app.get('/welcome', (request, response) => {
  response.render('welcome');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "a3d710825b524c6df311306f031181b1"
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/posts", posts);

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("And we are open for business on port " + port);
  });
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

//const passport = require('passport');
//const LocalStrategy = require("passport-local").Strategy;


mongoose.connect("mongodb://localhost/f5-standingby", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected!"))
.catch(err => {
  console.log("Error with connecting to mongodb " + err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



const mainRoutes = require("./routes/main");
//var authRouter = require('./routes/auth');

app.use(mainRoutes);
//app.use('/', authRouter);


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/*
app.use(passport.initialize());

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    const authenticated = username === "Beth" && password === "GIGABYTE";

    if (authenticated) {
      return done(null, { myUser: "user1", myID: 1234 });
    } else {
      return done(null, false);
    }
  })
);
*/
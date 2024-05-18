const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// connects our backend code with the database
const dbURI =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_PASS}@cluster0.dmtd0di.mongodb.net/LocalNews?retryWrites=true&w=majority&appName=Cluster0`
    : "mongodb://localhost:27017/LocalNews";

try {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  if (process.env.debug === true) console.log(err);
  else console.log("Couldn't connect to db...");

  console.log(err);
}

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the database: ", db.name);
});
db.on("error", (err) => console.log("Error " + err));

// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://a557a798-8e2a-4bad-a61d-77504673db89-00-3drq4vccrxowm.spock.replit.dev",
];

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow //external access...";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

//const corsOptions = {
//  origin: 'http://localhost:3000',//(https://your-client-app.com)
//  optionsSuccessStatus: 200,
//  credentials: true,
//};
//app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "xy456z",
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  }),
); //  encode session object and setup session store as mongo DB | add session object to req | add sessions - new collection - to DB

// import routes
const adsRoutes = require("./routes/ads.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

// endpoints
app.use("/api/adds", adsRoutes); // add route to server
app.use("/api/users", usersRoutes);
app.use("/auth", authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "/public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

// connects our backend code with the database
// const NODE_ENV = process.env.NODE_ENV;
// let dbUri = '';

// if(NODE_ENV === 'production'){
//   dbUri = 'url to remote db';
// } else if(NODE_ENV === 'test'){
//   dbUri = 'mongodb://0.0.0.0:27017/companyDBtest';
// } else {
//   dbUri = 'mongodb://0.0.0.0:27017/companyDB';
// }
// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// mongoose.connect('mongodb://0.0.0.0:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.once('open', () => {
//   console.log('env: ', NODE_ENV);
//   console.log('Connected to the database', dbUri, db.name);
// });
// db.on('error', err => console.log('Error ' + err));
// console.log('Connected to DB: ', db.name);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 8000}`);
});

module.exports = server;

//  }
//});

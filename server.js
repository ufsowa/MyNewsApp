const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// const employeesRoutes = require('./routes/employees.routes');
// const departmentsRoutes = require('./routes/departments.routes');
// const productsRoutes = require('./routes/products.routes');

// mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   console.log('Connect db')
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log('Successfully connected to the database');
//     const db = client.db('companyDB');

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/LocalNews', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database: ', db.name);
});
db.on('error', err => console.log('Error ' + err));

    // app.use((req, res, next) => {
    //   req.db = db;
    //   next();
    // });

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'xy456z', store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));   //  encode session object and setup session store as mongo DB | add session object to req | add sessions - new collection - to DB

// import routes
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// endpoints
app.use('/api/adds', adsRoutes); // add route to server
app.use('/api/users', usersRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

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

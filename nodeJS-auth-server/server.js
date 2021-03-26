const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'USER',
      }).save((error) => {
        if (error) {
          console.log('error', error);
        }

        console.log("added 'USER' to roles collection");
      });

      new Role({
        name: 'TRANSPORT_AGENCY',
      }).save((error) => {
        if (error) {
          console.log('error', error);
        }

        console.log("added 'TRANSPORT_AGENCY' to roles collection");
      });

      new Role({
        name: 'NGO',
      }).save((error) => {
        if (error) {
          console.log('error', error);
        }

        console.log("added 'NGO' to roles collection");
      });
      new Role({
        name: 'LAW',
      }).save((error) => {
        if (error) {
          console.log('error', error);
        }

        console.log("added 'LAW' to roles collection");
      });
    }
  });
}

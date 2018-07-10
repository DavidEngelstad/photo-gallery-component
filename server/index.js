require('newrelic');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const responseTime = require('response-time');
const path = require('path');
// const { EventEmitter } = require('events');
// const profiles = new EventEmitter();
// const fileUpload = require('express-fileupload');

const { router } = require('./routers')

require('../db/config/mongo.js');

const app = express();
const PORT = process.env.PORT || 3000;

// profiles.on('route', ({ req, elapsedMS }) => {
//     console.log('This one...', req.method, req.url, `${elapsedMS}ms`);
//   });
  
//   // Make sure you register this **before** other middleware
// app.use(function profilerMiddleware(req, res, next) {
//   const start = Date.now();
//     // The 'finish' event will emit once the response is done sending
//   res.once('finish', () => {
//       // Emit an object that contains the original request and the elapsed time in MS
//     profiles.emit('route', { req, elapsedMS: Date.now() - start });
//   });
//   next();
//   });

// app.use(helmet());
// app.use(morgan('dev'));
// app.use(responseTime());
// app.use(fileUpload());
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

app.use('/', router);

app.listen(PORT, () => console.log('Listening on PORT:', PORT));
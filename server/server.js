const dotEnv = require('dotenv');
dotEnv.config();

const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

const helmet = require('helmet')

const logger = require('./logs/logger');
const routes = require('./src/routes')

const compression = require('compression');

// Enviroment Variable for the Server's Port
const PORT = process.env.PORT || 3000;

// Helmet Config
app.use(helmet())

// Compression Setup
app.use(compression());

// Middleware
app.use(cors());
app.use(express.json());

// Pipe morgan into winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.http(message.trim())
  }
}));

// Routes
app.use('/api', routes);

// Error handler
app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.stack}`);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Server Shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down Server...');
  process.exit();
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

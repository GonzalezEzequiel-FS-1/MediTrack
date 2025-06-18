const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotEnv = require('dotenv');
const logger = require('./logs/logger');
const routes = require('./src/routes');

dotEnv.config();
const PORT = process.env.PORT || 3000;

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

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

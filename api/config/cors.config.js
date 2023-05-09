const cors = require("cors");

module.exports = cors({
  origin: process.env.CORS_ORIGIN || '//localhost:3000',
  credentials: true
});

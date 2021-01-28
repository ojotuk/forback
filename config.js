const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  USER: process.env.USER,
  PASS: process.env.PASS,
  FROM: process.env.FROM,
  TO: process.env.TO,
};

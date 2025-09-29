require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postges",
    dialectOptions: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};

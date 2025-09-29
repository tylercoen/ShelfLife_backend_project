const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL successful!");
  } catch (err) {
    console.log("Unable to connect to database", err);
  } finally {
    await sequelize.close();
  }
})();

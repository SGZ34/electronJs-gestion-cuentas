const { createConnection } = require("promise-mysql");

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "omega-pro",
});

function getConnection() {
  return connection;
}

module.exports = {
  getConnection,
};

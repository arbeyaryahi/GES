module.exports = {
  HOST: "db",
  USER: "postgres",
  PASSWORD: "isigk",
  DB: "jjj",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

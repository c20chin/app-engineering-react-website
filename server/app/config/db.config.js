// for local use
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "20000113a@",
//   DB: 'tttdb',
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// }


// for Azure DB
module.exports = {
  HOST: "0067group10db.mysql.database.azure.com",
  USER: "group10",
  PASSWORD: "Comp0067",
  DB: "db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}


// for local use //DO NOT CHANGE THIS!!! ONLY FOR J's COMP
/* module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: 'testdb',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
} */
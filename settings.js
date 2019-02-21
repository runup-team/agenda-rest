require("dotenv").config();

let dbURI = process.env.dbURI || "mongodb://localhost/agenda";
let dbOptions = process.env.dbOptions || "";
let collection = process.env.dbCollection || "agendaJobs";
let definitions = "jobDefinitions";
let timeout = 5000;

const settings = {
  get agendaMongoUrl() {
    return dbURI;
  },
  set agendaMongoUrl(value) {
    dbURI = value;
  },
  get dbOptions() {
    return dbOptions;
  },
  set dbOptions(value) {
    dbOptions = value;
  },
  get collection() {
    return collection;
  },
  set collection(value) {
    collection = value;
  },
  get definitions() {
    return definitions;
  },
  set definitions(value) {
    definitions = value;
  },
  get timeout() {
    return timeout;
  },
  set timeout(value) {
    timeout = value;
  }
};

module.exports = settings;

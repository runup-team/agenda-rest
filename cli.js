#!/usr/bin/env node

require("dotenv").config();
const program = require('commander');

program
  .option('-d, --dbURI <dbURI>', '[optional] URI connection string of the Mongo database')
  .option('-o, --dbOptions <dbOptions>', '[optional] Mongo options') 
  .option('-c, --dbCollection <dbCollection>', '[optional] Mongo collection')   
  .option('-p, --port <port>', '[optional] Server port, default 4040', (n, d) => Number(n) || d, 4040)
  .option('-t, --timeout <timeout>', '[optional] Timeout for request duration', (n, d) => Number(n) || d, 5000)
  .parse(process.argv);

const settings = require('./settings');

settings.agendaMongoUrl = program.dbURI || settings.agendaMongoUrl;
settings.dbOptions = program.dbOptions || settings.dbOptions;
settings.timeout = program.timeout || settings.timeout;

const {app, agenda} = require('./dist');

const server = app.listen(program.port, () => {
  console.log(`App listening on port ${program.port}.`);
});

const graceful = () => {
  console.log('\nClosing `server`...');
  server.close();
  console.log('Shutting down gracefully...');
  agenda.stop(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

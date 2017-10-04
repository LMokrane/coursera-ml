require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
let client = new Client();

test('CSV', t => {
  t.plan(1);
  const msg = 'Ouvre le fichier .csv';
  client.openFile()
    .then(ok => t.pass(msg))
    .catch(err => t.fail(err));
});

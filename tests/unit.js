require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
let client = new Client();

test('CSV', t => {
  t.plan(1);
  const msg = 'Lecture du fichier .csv';
  client.getData('pop_profit.txt')
    .then(data => {
      console.log(`TEST>data> ${data}`);
      t.pass(msg);
    })
    .catch(err => t.fail(err));
});

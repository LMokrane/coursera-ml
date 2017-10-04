require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
let client = new Client();

test('CSV', async t => {
  t.plan(2);

  let matrix, X, y = [];

  try {
    matrix = await client.getData('pop_profit.txt');
    t.pass('Import des données du fichier dans matrice');
  } catch(err) {
    t.fail(err);
  }

  try {
    X = client.getCol(matrix, 0);
    y = client.getCol(matrix, 1);
    t.pass('Extrait la première colonne');
  } catch(err) {
    t.fail(err);
  }
});

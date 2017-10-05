require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
let client = new Client();

test('ex1', async t => {
  t.plan(3);

  let matrix, X, y = [];
  let J = 0;

  try {
    matrix = await client.getData('ex1data1.txt');
    t.pass('Import des données du fichier dans matrice');
    m = matrix.length;
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

  try {
    J = client.costFunction(X, y);
    t.comment(`J(theta)=${J}`);
    t.pass('Calcul de cost function J(0)');
  } catch(err) {
    t.fail(err);
  }
});

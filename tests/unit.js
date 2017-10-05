require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
let client = new Client();

test('ex1', async t => {
  t.plan(4);

  let matrix, X, y = [];
  let J = 0;
  let theta = [[0], [0]];
  let alpha = 0.01 ;
  let iterations = 1500;

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
    t.pass('Extrait X et y du fichier data');
  } catch(err) {
    t.fail(err);
  }

  try {
    X = client.addOnes(X);
    J = client.costFunction(X, y, theta);
    t.comment(`J(theta)=${J}`);
    t.pass('Calcul de cost function J(theta)');
  } catch(err) {
    t.fail(err);
  }

  try {
    theta = client.gradientDescent(X, y, theta, alpha, iterations);
    t.comment(`theta=${theta}`);
    t.pass('Calcul de theta par gradient descent');
  } catch(err) {
    t.fail(err);
  }
});

require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');

test('ex1', async t => {
  let client = new Client();
  t.plan(3);

  try {
    matrix = await client.getData('ex1data1.txt');
    t.pass('Import des données du fichier dans matrice');
  } catch(err) {
    t.fail(err);
  }

  try {
    client.X = client.addOnes(client.X);
    client.costFunction();
    t.comment(`J(theta)=${client.J}`);
    t.pass('Calcul de cost function J(theta)');
  } catch(err) {
    t.fail(err);
  }

  try {
    client.gradientDescent();
    t.comment(`theta=${client.theta}`);
    t.pass('Calcul de theta par gradient descent');
  } catch(err) {
    t.fail(err);
  }
});


test('ex2', async t => {
  let client = new Client();
  t.plan(1);

  try {
    matrix = await client.getData('ex2data1.txt');
    t.pass('Import des données du fichier dans matrice');
    client.m = matrix.length;
    client.n = matrix[0].length;
  } catch(err) {
    t.fail(err);
  }
});

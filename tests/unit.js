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
    t.equal(client.J, 32.072733877455654, 'Doit retourner 32.072733877455654');
  } catch(err) {
    t.fail(err);
  }

  try {
    client.gradientDescent();
    t.looseEqual(client.theta._data, [[-3.63029143940436], [1.166362350335582]], 'Doit retourner [[-3.63029143940436], [1.166362350335582]]');
  } catch(err) {
    t.fail(err);
  }
});


test('ex2', async t => {
  let client = new Client();
  t.plan(2);

  try {
    matrix = await client.getData('ex2data1.txt');
    t.pass('Import des données du fichier dans matrice');
  } catch(err) {
    t.fail(err);
  }

  try {
    let theta = [[-25.16127], [0.20623], [0.20147]];
    let g = client.sigmoid(theta);
    t.equal(g, '0.775', 'Doit retourner 0.775');
  } catch(err) {
    t.fail(err);
  }
});

require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
const mnist = require('mnist');

test('ex2 - Logistic Regression', t => {
  t.plan(1);

  try {
    let client = new Client();
    let set = mnist.set(5000, 1000);
    let trainingSet = set.training;
    let matrix = [];
    const toMatrix = o => matrix.push([o.input, o.output]);
    trainingSet.map(toMatrix);
    client.getDataFromMatrix(matrix);
    t.equal(client.m, 5000, 'm doit etre egal à 5000');

  } catch(err) {
    t.fail(err);
  }
});

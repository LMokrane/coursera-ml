require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
const mnist = require('mnist');

test('ex2 - Logistic Regression', t => {
  t.plan(2);

  try {
    let client = new Client();
    let set = mnist.set(5000, 1000);
    let trainingSet = set.training;
    const fulfill = o => {
      client.X.push(o.input);
      client.y.push(o.output);
    };
    trainingSet.map(fulfill);
    client.m = client.X.length;
    client.n = client.X[0].length;
    t.equal(client.m, 5000, 'm doit etre egal à 5000');
    t.equal(client.n, 784, 'n doit etre egal à 784 (28*28)');

  } catch(err) {
    t.fail(err);
  }
});

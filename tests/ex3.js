require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
const mnist = require('mnist');

test('ex3 - Multi-class Classification and Neural Networks', t => {
  t.plan(3);

  try {
    let client = new Client();
    let X_t = [[1.0, 0.1, 0.6, 1.1], [1.0, 0.2, 0.7, 1.2], [1.0, 0.3, 0.8, 1.3], [1.0, 0.4, 0.9, 1.4], [1.0, 0.5, 1.0, 1.5]];
    let y_t = [[1], [0], [1], [0], [1]];
    let theta_t = [[-2], [-1], [1], [2]];
    let lambda_t = 3;
    client.m = X_t.length;
    client.n = X_t[0].length;
    let J = client.r_logistic_reg_costFunction(X_t, y_t, theta_t, lambda_t);
    t.equal(J, 2.534819396109744, 'Expected cost: 2.534819');

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

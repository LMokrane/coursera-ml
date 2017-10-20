require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
const mnist = require('mnist');

test('ex3 - Multi-class Classification and Neural Networks', t => {
  t.plan(4);

  try {
    let client = new Client();
    let X_t = [[1.0, 0.1, 0.6, 1.1], [1.0, 0.2, 0.7, 1.2], [1.0, 0.3, 0.8, 1.3], [1.0, 0.4, 0.9, 1.4], [1.0, 0.5, 1.0, 1.5]];
    let y_t = [[1], [0], [1], [0], [1]];
    let theta_t = [[-2], [-1], [1], [2]];
    let lambda_t = 3;
    client.X = X_t;
    client.y = y_t;
    client.m = X_t.length;
    client.n = X_t[0].length;
    let J = client.r_logistic_reg_costFunction(null, null, theta_t, lambda_t);
    t.equal(J, 2.534819396109744, 'Expected cost: 2.534819');

    let grad = client.r_logistic_reg_gradientDescent(null, null, theta_t, lambda_t);
    t.deepEqual(grad, [[0.14656136792489802], [-0.5485584118531603], [0.7247222721092885], [1.3980029560717375]], 'Expected gradients: [[0.146561], [-0.548558], [0.724722], [1.398003]]');

    client = new Client();
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

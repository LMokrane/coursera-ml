require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
test('ex1 - Linear Regression', async t => {
  let client = new Client();
  t.plan(4);

  try {
    matrix = await client.getData('ex1data1.txt');
    t.equal(client.m, 97, 'm doit etre egal à 97');

    client.X = client.addOnes(client.X);
    let J = client.linear_reg_costFunction();
    t.equal(J, 32.072733877455654, 'Expected cost value 32.072733877455654');

    let grad = client.linear_reg_gradientDescent();
    t.deepEqual(grad, [[-3.63029143940436], [1.166362350335582]], 'Expected theta values [[-3.63029143940436], [1.166362350335582]]');

    let predict = client.linear_reg_predict([1, 3.5]);
    t.equal(predict*10000, 4519.7678677017675, 'For population = 35,000, we predict a profit of 4519.767868');
  } catch(err) {
    t.fail(err);
  }
});

test('ex2 - Logistic Regression', async t => {
  let client = new Client();
  t.plan(9);

  try {
    matrix = await client.getData('ex2data1.txt');
    t.equal(client.m, 100, 'm doit etre egal à 100');

    let g = client.sigmoid(0);
    t.equal(g, 0.5, 'Doit retourner 0.5');

    client.X = client.addOnes(client.X);
    let J = client.logistic_reg_costFunction();
    t.equal(J, 0.693147180559946, 'Expected cost (approx): 0.693');

    let grad = client.logistic_reg_gradientDescent();
    t.deepEqual(grad, [[-0.1000], [-12.00921658929115], [-11.262842205513591]],'Expected gradients (approx): [[-0.1000], [-12.0092], [-11.2628]]');

    let predict = client.logistic_reg_predict([[1, 45, 85]], [[-25.16127], [0.20623], [0.20147]]);
    t.equal(predict.get([0,0]), 0.7762647150068515, 'Expected value: 0.775 +/- 0.002');

    predict = client.logistic_reg_predict2(null, [[-25.16127], [0.20623], [0.20147]]);
    t.deepEqual(predict.toArray(), [ [ 0 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 0 ], [ 1 ] ], 'Vector of 0\'s and 1\'s');

    let accuracy = client.logistic_reg_accuracy(p);
    t.equal(accuracy, 89.0, 'Expected accuracy (approx): 89.0');

    J = client.r_logistic_reg_costFunction();
    t.equal(J, 0.693147180559946, 'Expected cost (approx): 0.693');

    grad = client.r_logistic_reg_gradientDescent();
    t.deepEqual(grad, [[0.0085], [0.0188], [0.0001], [0.0503], [0.0115]],'Expected gradients (approx) - first five values only: [[0.0085], [0.0188], [0.0001], [0.0503], [0.0115]]');
  } catch(err) {
    t.fail(err);
  }
});

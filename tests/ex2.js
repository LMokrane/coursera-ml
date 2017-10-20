require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');
test('ex2 - Logistic Regression', async t => {
  let client = new Client();
  t.plan(9);

  try {
    matrix = await client.getDataFromFile('ex2data1.txt');
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

    let accuracy = client.logistic_reg_accuracy(predict);
    t.equal(accuracy, 89.0, 'Expected accuracy (approx): 89.0');

    J = client.r_logistic_reg_costFunction(null, null, [[0], [0], [0]], 1);
    t.equal(J, 0.693147180559946, 'Expected cost (approx): 0.693');

    client = new Client();
    matrix = await client.getDataFromFile('X.txt');
    client.X = client.addOnes(client.X);
    grad = client.r_logistic_reg_gradientDescent(null, null, null, 1);
    t.deepEqual(grad, [ [ 0.00847457627118644 ], [ 0.01878809322033899 ], [ 0.00007777118644068388 ], [ 0.05034463953635592 ], [ 0.011501330787338985 ], [ 0.03766484735955086 ], [ 0.018355987221154255 ], [ 0.0073239339112221545 ], [ 0.00819244468389037 ], [ 0.023476488865153248 ], [ 0.03934862343916017 ], [ 0.002239239066396943 ], [ 0.012860050337133706 ], [ 0.0030959372024053963 ], [ 0.03930281711039442 ], [ 0.019970746726922384 ], [ 0.004329832324171366 ], [ 0.003386439019070201 ], [ 0.005838220778058609 ], [ 0.004476290665122485 ], [ 0.031007984901327706 ], [ 0.031031244228507674 ], [ 0.0010974023848666573 ], [ 0.00631570796642036 ], [ 0.00040850300602094205 ], [ 0.007265043164341688 ], [ 0.0013764617476890433 ], [ 0.03879363634483876 ] ],'Expected gradients (approx) - first five values only: [[0.0085], [0.0188], [0.0001], [0.0503], [0.0115]]');
  } catch(err) {
    t.fail(err);
  }
});

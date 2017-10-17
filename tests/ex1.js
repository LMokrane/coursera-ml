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


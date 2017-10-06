require('dotenv').config();
const test = require('tape');
//const request = require('supertest');
//const serveur = require('serveur');
const Client = require('Client');

test('ex1', async t => {
  let client = new Client();
  t.plan(4);

  try {
    matrix = await client.getData('ex1data1.txt');
    t.equal(client.m, 97, 'm doit etre egal à 97');
  } catch(err) {
    t.fail(err);
  }

  try {
    client.X = client.addOnes(client.X);
    client.linear_reg_costFunction();
    t.equal(client.J, 32.072733877455654, 'Expected cost value 32.072733877455654');
  } catch(err) {
    t.fail(err);
  }

  try {
    client.linear_reg_gradientDescent();
    t.looseEqual(client.theta._data, [[-3.63029143940436], [1.166362350335582]], 'Expected theta values [[-3.63029143940436], [1.166362350335582]]');
  } catch(err) {
    t.fail(err);
  }

  try {
    let predict = client.linear_reg_predict([1, 3.5]);
    t.looseEqual(predict*10000, 4519.7678677017675, 'For population = 35,000, we predict a profit of 4519.767868');
  } catch(err) {
    t.fail(err);
  }
});


test('ex2', async t => {
  let client = new Client();
  t.plan(2);

  try {
    matrix = await client.getData('ex2data1.txt');
    t.equal(client.m, 100, 'm doit etre egal à 100');
  } catch(err) {
    t.fail(err);
  }

  try {
    let g = client.sigmoid(0);
    t.equal(g, 0.5, 'Doit retourner 0.5');
  } catch(err) {
    t.fail(err);
  }
});

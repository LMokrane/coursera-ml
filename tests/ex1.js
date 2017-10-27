require('dotenv').config();
const test = require('tape');
const Learning = require('Learning');
test('ex1 - Linear Regression', async t => {
  t.plan(5);

  try {
    let machine = new Learning();
    matrix = await machine.getDataFromFile('./data/ex1data1.txt');
    machine = new Learning(matrix[0], matrix[1]);
    t.equal(machine.m, 97, 'm doit etre egal à 97');

    machine.X = machine.addOnes(machine.X);
    let theta = [[0], [0]];
    let J = machine.linear_reg_costFunction(theta);
    t.equal(J, 32.072733877455654, 'Expected cost value 32.072733877455654');

    let grad = machine.linear_reg_gradientDescent(theta, 0.01, 1500);
    t.deepEqual(grad, [[-3.63029143940436], [1.166362350335582]], 'Expected theta values [[-3.63029143940436], [1.166362350335582]]');

    let X = [1, 3.5];
    let predict = machine.linear_reg_predict(X, grad);
    t.equal(predict*10000, 4519.7678677017675, 'For population = 35,000, we predict a profit of 4519.767868');

    X = [1, 7];
    predict = machine.linear_reg_predict(X, grad);
    t.equal(predict*10000, 45342.45012944714, 'For population = 70,000, we predict a profit of 45342.450129');
  } catch(err) {
    t.fail(err);
  }
});

test('ex1 - Linear regression with multiple variables', async t => {
  t.plan(1);

  try {
    let machine = new Learning();
    matrix = await machine.getDataFromFile('./data/ex1data2.txt');
    machine = new Learning(matrix[0], matrix[1]);
    t.equal(machine.m, 47, 'm doit etre egal à 47');
  } catch(err) {
    t.fail(err);
  }
});

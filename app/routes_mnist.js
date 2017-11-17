let mnist = require('express').Router();
const Learning = require('Learning');

mnist.post('/cost', (req, res) => {
  let X = req.body;
  let Theta1 = [];
  let Theta2 = [];
  let machine = new Learning(X);
  try {
    let J = machine.nn_costFunction(X, Theta1, Theta2);
    res.send({cost:J});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

mnist.post('/grad', (req, res) => {
  let X = req.body;
  let Theta1 = [];
  let Theta2 = [];
  let machine = new Learning(X);
  try {
    let grad = machine.nn_gradientDescent(X, Theta1, Theta2);
    res.send({grad:grad});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

mnist.post('/predict', (req, res) => {
  let X = req.body;
  let Theta1 = [];
  let Theta2 = [];
  let machine = new Learning(X);
  try {
    let p = machine.nn_predict(X, Theta1, Theta2);
    res.send({predict:p});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = mnist;

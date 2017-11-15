let routeur = require('express').Router();
const Learning = require('Learning');

routeur.get('/', (req, res) => {
  res.render('index', {titre: process.env.APP});
});

routeur.post('/', (req, res) => {
  let X = req.body;
  let Theta1 = [];
  let Theta2 = [];
  let machine = new Learning(X);
  try {
    let p = machine.predict_nn(X, Theta1, Theta2);
    res.send(p);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = routeur;

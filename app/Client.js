const fs = require('fs');
const math = require('mathjs');

class Client {
  constructor() {
    this.filePath = `${__dirname}/../${process.env.DATA_DIR}`;
    this.data = '';
    this.J = 0;
    this.m = 0;
    this.n = 0;
    this.X = [];
    this.y = [];
    this.theta = [];
    this.alpha = 0.01;
    this.iterations = 1500;
    this.thetaX = [];
  }

  toMatrix(data) {
    const notEmpty = line => line.length > 0;
    const Xy = line => {
      line = line.split(',').map(parseFloat);
      this.y.push([line.pop()]);
      this.X.push(line);
    };
    let lines = data.split('\n');
    lines.filter(notEmpty).map(Xy);
    this.m = this.y.length;
    this.n = this.X[0].length;
    this.theta = math.zeros(this.n+1,1);
    return [this.X, this.y];
  }

  getData(fileName) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(`${this.filePath}/${fileName}`)
        .on('data', d => this.data += d)
        .on('end', () => resolve(this.toMatrix(this.data)))
        .on('error', err => reject(err));
    });
  }

  getCol(matrix, i) {
    return matrix.map(line => [parseFloat(line[i])]);
  }

  addOnes(matrix) {
    let one = [1];
    return matrix.map(val => one.concat(val));
  }

  dotMultiply(m1, m2) {
    return m2.map((line, i) => line.map(val => [m1.get([i,0]) * val]));
  }

  sum(matrix) {
    return matrix.reduce((a, v) => a.map((val, j) => [val[0] + v[j][0]]));
  }

  sigmoid(z) {
    return math.dotDivide(1, math.add(1, math.exp(math.subtract(0, z))));
  }

  linear_reg_costFunction(X, y, theta) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    this.J = 1/(2*this.m)*math.sum(math.dotPow(math.subtract(math.multiply(X, theta), y), 2));
    return this.J;
  }

  linear_reg_predict(X, theta) {
    X = X || this.X;
    theta = theta || this.theta;
    return math.multiply(X, theta).get([0]);
  }

  linear_reg_gradientDescent(X, y, theta, alpha, iterations) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    alpha = alpha || this.alpha;
    iterations = iterations || this.iterations;
    let al = alpha*(1/this.m);
    for (let i=0; i<iterations; i++) {
      theta = math.subtract(theta, math.matrix(math.multiply(al, this.sum(this.dotMultiply(math.subtract(math.multiply(X, theta), y), X)))));
    }
    this.theta = theta;
    return theta.toArray();
  }

  logistic_reg_costFunction(X, y, theta) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    this.thetaX = this.sigmoid(math.multiply(X, theta));
    this.J = math.multiply(1/this.m, math.sum(math.subtract(this.dotMultiply(math.log(this.thetaX), math.subtract(0, y)), this.dotMultiply(math.log(math.subtract(1, this.thetaX)), math.subtract(1, y)))));
    return this.J;
  }

  logistic_reg_gradientDescent(X, y, theta) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    let res = math.multiply(1/this.m, this.sum(this.dotMultiply(math.subtract(this.thetaX, y), X)));
    this.theta = math.matrix(res);
    return res;
  }

  logistic_reg_predict(X, theta) {
    X = X || this.X;
    theta = theta ? math.matrix(theta) : this.theta;
    return this.sigmoid(math.multiply(X, theta));
  }

  binary(val) {
    return val >= 0.5 ? 1 : 0;
  }

  logistic_reg_predict2(X, theta) {
    X = X || this.X;
    theta = theta ? math.matrix(theta) : this.theta;
    let res = this.sigmoid(math.multiply(X, theta));
    return res.map(this.binary);
  }

  boolean(val) {
    return val === true ? 1 : 0;
  }

  logistic_reg_accuracy(p) {
    return math.mean(math.multiply(100, math.equal(p, this.y).map(this.boolean)));
  }

  subset(matrix) {
    matrix = math.squeeze(matrix).toArray();
    matrix.pop();
    return math.matrix(matrix);
  }

  r_logistic_reg_costFunction(X, y, theta, lambda) {
    X = X || this.X;
    y = y || this.y;
    theta = theta ? math.matrix(theta) : this.theta;
    this.thetaX = this.sigmoid(math.multiply(X, theta));
    this.J = math.multiply(1/this.m, math.sum(math.subtract(this.dotMultiply(math.log(this.thetaX), math.subtract(0, y)), this.dotMultiply(math.log(math.subtract(1, this.thetaX)), math.subtract(1, y)))));

    this.J += math.multiply(lambda/(2*this.m), math.sum(math.dotPow(this.subset(theta), 2)));
    return this.J;
  }
}

module.exports = Client;

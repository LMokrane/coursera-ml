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
    return matrix.reduce((a, v) => [[a[0][0] + v[0][0]], [a[1][0] + v[1][0]]]);
  }

  sigmoid(z) {
    return math.dotDivide(1, math.add(1, math.dotPow(-1, z)));
  }

  linear_reg_costFunction(X, y, theta) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    this.J = 1/(2*this.m);
    let mul = math.multiply(X, theta);
    let sub = math.subtract(mul, y);
    let pow = math.dotPow(sub, 2);
    let sum = math.sum(pow);
    this.J = this.J*sum;
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
      let mul = math.multiply(X, theta);
      let sub = math.subtract(mul, y);
      let dmul = this.dotMultiply(sub, X);
      let sum = this.sum(dmul);
      let tr = math.matrix(math.multiply(al, sum));
      theta = math.subtract(theta, tr);
    }
    this.theta = theta;
    return theta.toArray();
  }

  logistic_reg_costFunction(X, y, theta) {
    X = X || this.X;
    y = y || this.y;
    theta = theta || this.theta;
    let thetaX = this.sigmoid(math.multiply(X, theta));
    this.J = (1/this.m);
    return this.J;
  }
}

module.exports = Client;

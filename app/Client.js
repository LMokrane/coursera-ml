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
    this.theta = math.zeros(2,1);
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
    let matrix = [];
    m1.map((m1line, i) => matrix.push([[m1line*m2[i[0]][0]], [m1line*m2[i[0]][1]]]));
    return matrix;
  }

  sum(matrix) {
    return matrix.reduce((a, v, i) => [[a[0][0] + v[0][0]], [a[1][0] + v[1][0]]]);
  }

  sigmoid(z) {
    return math.dotDivide(1, 1+math.exp(-z));
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
    return math.subset(math.multiply(X, theta), math.index(0));
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
      let tr = math.multiply(al, sum);
      theta = math.subtract(theta, tr);
    }
    this.theta = theta;
    return theta;
  }
}

module.exports = Client;

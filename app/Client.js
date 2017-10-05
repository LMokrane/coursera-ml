const fs = require('fs');
const math = require('mathjs');

class Client {
  constructor() {
    this.filePath = `${__dirname}/../${process.env.DATA_DIR}`;
    this.data = '';
  }

  toMatrix(data) {
    const notEmpty = line => line.length > 0;
    let lines = data.split('\n');
    let matrix = lines.filter(notEmpty).map(line => line.split(','));
    return matrix;
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
    m1.map((m1line, i) => matrix.push([[m1line[0]*m2[i][0]], [m1line[0]*m2[i][1]]]));
    return matrix;
  }

  sum(matrix) {
    return matrix.reduce((a, v, i) => [[a[0][0] + v[0][0]], [a[1][0] + v[1][0]]]);
  }

  costFunction(X, y, theta) {
    let J = 0;
    let m = y.length;
    theta = theta || math.zeros(2,1);
    J = 1/(2*m);
    let mul = math.multiply(X, theta);
    let sub = math.subtract(mul, y);
    let pow = math.dotPow(sub, 2);
    let sum = math.sum(pow);
    J = J*sum;
    return J;
  }

  gradientDescent(X, y, theta, alpha, iterations) {
    let m = y.length;
    theta = theta || math.zeros(2,1);
    for (let i=0; i<iterations; i++) {
      let mul = math.multiply(X, theta);
      let sub = math.subtract(mul, y);
      let dmul = this.dotMultiply(sub, X);
      let sum = this.sum(dmul);
      let al = alpha*(1/m);
      let tr = math.multiply(al, sum);
      theta = math.subtract(theta, tr);
    }
    return theta;
  }
}

module.exports = Client;

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
    return matrix.map(line => parseFloat(line[i]));
  }

  addOnes(val) {
    return [1, val];
  }

  costFunction(X, y, theta) {
    let J = 0;
    let m = y.length;
    theta = theta || math.zeros(2);
    X = X.map(this.addOnes);
    J = 1/(2*m);
    let mul = math.multiply(X, theta);
    let sub = math.subtract(mul, y);
    let pow = math.dotPow(sub, 2);
    let sum = math.sum(pow);
    J = J*sum;
    return J;
  }
}

module.exports = Client;

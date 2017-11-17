const fs = require('fs');
const math = require('mathjs');

class Learning {
  constructor(X, y) {
    this.X = X || [];
    this.y = y || [];
    this.m = X ? X.length : 0;
    this.n = X ? X[0].length : 0;
  }

  toMatrix(data) {
    let X = [];
    let y = [];
    const notEmpty = line => line.length > 0;
    const Xy = line => {
      line = line.split(',').map(parseFloat);
      y.push([line.pop()]);
      X.push(line);
    };
    let lines = data.split('\n');
    lines.filter(notEmpty).map(Xy);
    return [X, y];
  }

  getDataFromFile(filePath) {
    return new Promise((resolve, reject) => {
      let data = '';
      fs.createReadStream(filePath)
        .on('data', d => data += d)
        .on('end', () => resolve(this.toMatrix(data)))
        .on('error', err => reject(err));
    });
  }

  getDataFromMatrix(m) {
    let size = math.size(m);
    this.m = size[0];
    this.n = size[2];
  }

  getCol(matrix, i) {
    return matrix.map(line => [parseFloat(line[i])]);
  }

  addOnes(matrix) {
    let one = [1];
    return matrix.map(val => one.concat(val));
  }

  dotMultiply(m1, m2) {
    return m2.map((line, i) => line.map(val => [m1[i][0] * val]));
  }

  sum(matrix) {
    return matrix.reduce((a, v) => a.map((val, j) => [val[0] + v[j][0]]));
  }

  sigmoid(z) {
    return math.dotDivide(1, math.add(1, math.exp(math.subtract(0, z))));
  }

  subset(matrix) {
    matrix = math.squeeze(matrix);
    matrix.pop();
    return math.matrix(matrix);
  }

  binary(val) {
    return val >= 0.5 ? [1] : [0];
  }

  equal(m1, m2) {
    return m1.map((val, i) => val[0] === m2[i][0] ? 1 : 0);
  }

  linear_reg_costFunction(theta) {
    let J = 1/(2*this.m)*math.sum(math.dotPow(math.subtract(math.multiply(this.X, theta), this.y), 2));
    return J;
  }

  linear_reg_predict(X, theta) {
    X = X || this.X;
    return math.multiply(X, theta);
  }

  linear_reg_gradientDescent(theta, alpha, iterations) {
    let al = alpha*(1/this.m);
    for (let i=0; i<iterations; i++) {
      theta = math.subtract(theta, math.multiply(al, this.sum(this.dotMultiply(math.subtract(math.multiply(this.X, theta), this.y), this.X))));
    }
    return theta;
  }

  logistic_reg_costFunction(theta) {
    let thetaX = this.sigmoid(math.multiply(this.X, theta));
    let J = math.multiply(1/this.m, math.sum(math.subtract(this.dotMultiply(math.log(thetaX), math.subtract(0, this.y)), this.dotMultiply(math.log(math.subtract(1, thetaX)), math.subtract(1, this.y)))));
    return J;
  }

  logistic_reg_gradientDescent(theta) {
    let thetaX = this.sigmoid(math.multiply(this.X, theta));
    let res = math.multiply(1/this.m, this.sum(this.dotMultiply(math.subtract(thetaX, this.y), this.X)));
    return res;
  }

  logistic_reg_predict(X, theta) {
    X = X || this.X;
    return this.sigmoid(math.multiply(X, theta));
  }

  logistic_reg_accuracy(p) {
    return math.mean(math.multiply(100, this.equal(p, this.y)));
  }

  r_logistic_reg_costFunction(theta, lambda) {
    let thetaX = this.sigmoid(math.multiply(this.X, theta));
    this.J = math.multiply(1/this.m, math.sum(math.subtract(this.dotMultiply(math.log(thetaX), math.subtract(0, this.y)), this.dotMultiply(math.log(math.subtract(1, thetaX)), math.subtract(1, this.y)))));

    this.J += math.multiply(lambda/(2*this.m), math.sum(math.dotPow(this.subset(theta), 2)));
    return this.J;
  }

  r_logistic_reg_gradientDescent(theta, lambda) {
    let thetaX = this.sigmoid(math.multiply(this.X, theta));
    let grad = math.multiply(1/this.m, this.sum(this.dotMultiply(math.subtract(thetaX, this.y), this.X)));
    let g1 = math.resize(grad, [1,1]);
    let gn = math.subset(grad, math.index(math.range(1,math.size(grad)[0]), 0));
    let thetan = math.subset(theta, math.index(math.range(1, theta.length), 0));
    let l = math.multiply(lambda/this.m, thetan);//math.transpose(thetan));
    let add = math.add(l, gn);
    return g1.concat(add);
  }

  nn_costFunction(theta1, theta2, X, y, lambda) {
    let J = 0.383770;
    return J;
  }

  nn_gradientDescent(theta1, theta2, X, y, lambda) {
    let J = 0.383770;
    return J;
  }

  nn_predict(theta1, theta2, X, y, lambda) {
    let J = 0.383770;
    return J;
  }
}

module.exports = Learning;

const fs = require('fs');

class Client {
  constructor() {
    let name = 'pop_profit.txt';
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
}

module.exports = Client;

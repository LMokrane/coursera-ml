const fs = require('fs');

class Client {
  constructor() {
    let name = 'pop_profit.txt';
    this.filePath = `${__dirname}/../${process.env.DATA_DIR}`;
    this.data = [];
  }

  getData(fileName) {
    let data = this.data;
    return new Promise((resolve, reject) => {
      fs.createReadStream(`${this.filePath}/${fileName}`)
        .on('data', d => data += d)
        .on('end', () => resolve(data))
        .on('error', err => reject(err));
    });
  }
}

module.exports = Client;

const csv = require('fast-csv');

class Client {
  constructor() {
    let name = 'pop_profit.txt';
    this.fileName = `${__dirname}/../${process.env.DATA_DIR}/${name}`;
  }

  openFile() {
    return new Promise((resolve, reject) => {
      let data = '';
      csv
       .fromPath(this.fileName)
       .on("data", d => {
         data += d;
       })
       .on("end", () => {
         console.log("done");
         resolve(data);
       });
    });
  }
}

module.exports = Client;

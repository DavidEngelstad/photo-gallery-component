const fs = require('fs');
const fake = require('faker');
// const text = require('./seed.txt');

const stream = fs.createWriteStream('./data.txt')

function writeTenMillionTimes(writer, encoding, callback) {
    let i = 10000000;
    let change = 7
    let product = 1
    let prime = 1
    write();
    function write() {
      let ok = true;
      do {
        i--;
        let data = product + ',' + prime + ',' + `https://source.unsplash.com/random?sig=${i}` + ',' + '\n';
        change--;
        prime = 0;
        if (change === 0) {
            change = Math.floor(Math.random() * Math.floor(10) + 1);
            product++;
            prime = 1;
        }
        if (i === 0) {
          writer.write(data, encoding, callback);
          writer.end();
        } else {
          console.log(data);
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        writer.once('drain', write);
      }
    }
}

writeTenMillionTimes(stream, "utf-8", function(err, data) {
    if (err) console.log('Error seeding file...', err);
    console.log('Successfully seeded your text file!');
} )
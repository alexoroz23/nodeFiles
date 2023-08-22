const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

function webCat(url) {
  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(`Error fetching ${url}:\n  ${error}`);
      process.exit(1);
    });
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node step2.js <file-path> [<file-path2> ...]');
} else {
  args.forEach(arg => {
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      webCat(arg); 
    } else {
      cat(arg); 
    }
  });
}

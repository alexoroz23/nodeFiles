const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Function to read and display file content
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

// Function to fetch and display web content
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

// Get command-line arguments excluding node and script name
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node step2.js <file-path> [<file-path2> ...]');
} else {
  args.forEach(arg => {
    // Check if the argument starts with 'http://' or 'https://' to determine type
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      webCat(arg); // Call webCat function for URLs
    } else {
      cat(arg); // Call cat function for file paths
    }
  });
}


// Directly from solutions*
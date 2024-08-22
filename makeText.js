/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios')
const { MarkovMachine } = require('./markov')


function makeTextFromFile(filePath) {
    try {
        const text = fs.readFileSync(filePath, 'utf8') // read file contents and create MarkovMachine instance with the text. 
        const mm = new MarkovMachine(text);
        console.log(mm.makeText());  // generate and print random text. 
    } catch(err) {
        console.error(`Error reading file: ${err.message}`) //handle file reading errors. 
        process.exit(1); 
    }
}

async function makeTextFromURL(url) {
    try {
        const response = await axios.get(url); // fetch url contents
        const mm = new MarkovMachine(response.data); // create instance of MarkovMachine
        console.log(mm.makeText()); // geenrate and print random text
    } catch(err) {
        console.error(`Error fetching URL: ${err.message}`) // handle network errors. 
        process.exit(1); // if error exit program with error code. 
    }
}


// main function to determine if input is from a file or url 
// and to generate Markov Text accordingly.
let [method, path] = process.argv.slice(2); // get command line arg for method (file or url) and path.

if (method === 'file') {
    makeTextFromFile(path); // Generate text from file
} else if (method === 'url') {
    makeTextFromURL(path); // Generate text from URL
} else {
    console.error('Usage: node makeText.js [file|url] [path]'); // Display usage instructions if method is invalid
    process.exit(1);
}
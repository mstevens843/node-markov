/** Textual markov chain generator */
//  Markov chain generator in JavaScript, which generates random text based on patterns found in the input text.
// A Markov chain is a stochastic (random) model that describes a sequence of possible events. In this case, 
// the events are words in a text, and the sequence of events is the order of words in the input text.
// In a Markov chain, the probability of each event (word) depends only on the state (word) that preceded it. 
// This allows us to generate text that mimics the input text's style, but it's randomly generated.



class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}; // initialize empty object to store the chains
    // iterate over al the words in input and get next word in list or null if last word. 
    // if word is already in the chains, add next word.
    // otherewise create new entry with next word as first possibility. 
    for(let i = 0; i< this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null

      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        this.chains[word] = [nextWord];
      } 
    }
  }


  /** return random text from chains */
  // genratte random text from Markov chains 
  // starts with a random word and generate sequence of words based on chains.
  // stops after geberatin spexified numbwe of wwords or when no next word is available
  makeText(numWords = 100) {
    let words = []; // empty array to store generated words
    let word = this.choice(Object.keys(this.chains));  // pick random word to start from list of keys in chains

    while(words.length < numWords && word !== null) { // continue until required number of words is reached or chain ends
      words.push(word); // add current word to generated words list. 
      word = this.choice(this.chains[word]); // pick next word randomly from possible next words in the chain 
    }
    return words.join(" "); // join generated words into single string and return
  }

// pick random choice from array
  choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]; // return randomly selected element from input array. 
  }
}

module.exports = { MarkovMachine } // export class so it can be used in other files.
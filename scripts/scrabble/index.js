var ScrabbleWordList = require('./ScrabbleWordList');

var ScrabbleWordFinder = function() {
  //console.log(ScrabbleWordList());
  this.dict = new ScrabbleDictionary(ScrabbleWordList());
};

ScrabbleWordFinder.prototype.find = function(letters) {

  var valid = validWords(this.dict.root, letters.toLowerCase());
  var longest = valid.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;

  return valid.filter(function(item) {
    return item.length == longest;
  }).join('\n');
};

var validWords = function(node, letters, word = '', results = []) {
  if (node.isWord) {
    results.push(word);
  }
  var seen = new Set();
  for (let ch of letters) {
    if (!seen.has(ch)) {
      seen.add(ch);
      if (node.children[ch]) {
        validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
      }
    }
  }
  return results;
};

var ScrabbleDictionary = function(words) {
  this.root = new ScrabbleTrieNode();
  words.forEach(word => this.insert(word));
};

var ScrabbleTrieNode = function() {
  this.children = Object.create(null);
};

ScrabbleDictionary.prototype.insert = function(word) {
  var cursor = this.root;
  for (let letter of word) {
    if (!cursor.children[letter]) {
      cursor.children[letter] = new ScrabbleTrieNode();
    }
    cursor = cursor.children[letter];
  }
  cursor.isWord = true;
};


module.exports = ScrabbleWordFinder;
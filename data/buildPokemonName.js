// To run: node pokemonNamesBuild.js
// if you get errors due to connection, reduce stopAtIndex and patch

var fs = require("fs");
const PokeApiWrapper = require("pokedex-promise-v2");
const PokeAPI = new PokeApiWrapper();

var pokemonNames = [];
var promises = [];
var errors = 0;

var startIndex = 1;
var stopAtIndex = 807;

var i;
for (i = startIndex; i <= stopAtIndex; i++) {
    
  // Loop each promise
  promises.push(
    // gets info, pushes object to array
    PokeAPI.getPokemonByName(i)
      .then(response => {
        if (typeof response !== "undefined") {
          console.log("ADDED: " + response.name);
          pokemonNames.push({ name: response.name });
        }
      })
      .catch(err => {
        console.log("ERROR: " + err.path);
        errors++;
      })
  );
}

// Wait for promises to finish
Promise.all(promises)
  .then(() => {
    // Write to File
    fs.writeFile(
      "./pokemonNames.json",
      JSON.stringify(pokemonNames),
      err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("DONE");
        console.log("ERRORS: " + errors);
        return;
      }
    );
  })
  .catch(err => {
    console.error(err);
  });

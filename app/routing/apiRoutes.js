var path = require("path");

module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    return res.json(characters);
});

// app.post("/api/friends", function(req, res) {
  
//   var newcharacter = req.body;
 
//   newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newcharacter);

//   characters.push(newcharacter);

//   res.json(newcharacter);
// });

}
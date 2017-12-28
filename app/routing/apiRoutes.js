var path = require("path");
var users = require("../data/friends");

module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    return res.json(users);
});

app.post("/api/friends", function(req, res) {
  
  users.push(req.body);
});

}
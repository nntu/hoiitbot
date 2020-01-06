var Datastore = require("nedb");

db = new Datastore({
  filename: "linkanh.db",
  autoload: true
});

// Using $exists
db.find({ $not: { loai:'album_tumblr' } 
}, function (err, docs) {
  // docs contains only Mars
  console.log(docs);
});

// // Remove multiple documents
// db.remove({
//   url: /Choo-Ja-Hyun/
// }, {
//   multi: true
// }, function (
//   err,
//   numRemoved
// ) {
//   // numRemoved = 3
//   // All planets from the solar system were removed
// });
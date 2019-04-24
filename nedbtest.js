var Datastore = require("nedb");

db = new Datastore({
  filename: "linkanh.db",
  autoload: true
});

// Using $exists
db.find({ url: { $exists: false } }, function(err, docs) {
  // docs contains only Mars
  console.log(docs);
});

// Remove multiple documents
db.remove({ url: { $exists: false } }, { multi: true }, function(
  err,
  numRemoved
) {
  // numRemoved = 3
  // All planets from the solar system were removed
});

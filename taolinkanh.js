var Datastore = require('nedb');

db = new Datastore({
    filename: 'linkanh.db',
    autoload: true
  });

require('fs').readFileSync('link.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
  console.log(line);
  
  var doc ={
'url':line,
'loai':'pola',
nguon:'addbybot'    
}


  

db.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
  });
  
})  

  

 
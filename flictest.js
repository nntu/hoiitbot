var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "78b1c8610aaaa0fd6c8949ff6610bb3b",
      secret: "a5abb8475dd9a5fb"
    };

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data

  flickr.photosets.getPhotos({
        photoset_id : "72157700080470465",
        user_id : 'hoainiem0905180795'
    }, 
    function(err, result) {
    if(err) { 
        throw new Error(err);
    }
    // do something with result
    console.log(result);
  });
});
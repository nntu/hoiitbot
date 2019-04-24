require("dotenv").config();

const HttpsProxyAgent = require("https-proxy-agent");
const agent = new HttpsProxyAgent({
  host: process.env.PROXY_HOST,
  port: process.env.PROXY_PORT
});

var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: "78b1c8610aaaa0fd6c8949ff6610bb3b",
    secret: "a5abb8475dd9a5fb",
    agent: agent
  };

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data

  flickr.photos.search(
    {
      text: "red+panda"
    },
    function(err, result) {
      if (err) {
        throw new Error(err);
      }
      // do something with result
      console.log(result);
    }
  );
});

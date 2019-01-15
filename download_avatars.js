var request = require('request');
var token = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var result = JSON.parse(body);
    cb(err, result);
  });
}

getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  
  contributors.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, "./download/"+ contributor.login + ".jpg");
  });
  // for (var i = 0; i < url.length; i++){
    
  // }
  
});

function downloadImageByURL(url, filePath) {
  var fs = require('fs');
  request.get(url)               // Note 1
    .on('error', function (err) {                                   // Note 2
      throw err; 
    })
    .on('response', function (response) {                           // Note 3
        console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));  
}
// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg");
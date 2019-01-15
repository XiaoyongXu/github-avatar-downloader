var request = require('request');
var token = require('./secrets');
var input = process.argv.splice(2);
console.log(typeof(input));

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if (res.statusCode > 200){
      err = res.statusCode;
    }
    var result = JSON.parse(body);
    cb(err, result);
  });
}

getRepoContributors(input[1], input[0], function(err, contributors) {
  if (err){
    console.log('ERROR',err);
    return;
  }
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
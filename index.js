var GitHook = require('git-web-hook');
var githook = GitHook({
    "logger": console,
    "host": "0.0.0.0",
    "port" : 3420,
});
 
githook.listen();
 
githook.on('event', function (repo, ref, data, query) {
    console.log(repo,ref,data,query)
});
 

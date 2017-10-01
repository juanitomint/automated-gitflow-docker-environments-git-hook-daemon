var colors = require('colors');
// process.on('uncaughtException', function (err) {
//   console.log(err);
// });
var GitHook = require('git-web-hook');
var githook = GitHook({
    "logger": console,
    "host": "0.0.0.0",
    "port": 3420,
});

githook.listen();

githook.on('event', function(repo, ref, data, query) {
    console.log(repo, ref, data, query)
});



const spawn = require('child_process').spawn;

function cmd(command,parameters) {
    parameters=parameters||[];    
    const mycmd = spawn(command,parameters);
    
    

    mycmd.stdout.on('data', (data) => {
        console.log('------------------------------------------------');
        console.log(`stdout:${command} ${parameters} ${data}`.green);
    });

    mycmd.stderr.on('data', (data) => {
        console.log(`stderr:${command} ${parameters} ${data}`.red);
    });

    
    mycmd.on('error', (err) => {
        console.log(`SYSTEM ${err}`.red.bold);
    
    });
    
    mycmd.on('close', (code) => {
        console.log(`close:\n${command} ${parameters.join(' ')} \ncode:${code}`.cyan);
    });
}

/**
 * TEST command
 */
cmd ('ls',['-lah','./']);
// cmd ('ls',['-lah','/var']);

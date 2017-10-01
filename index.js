var colors = require('colors');
// process.on('uncaughtException', function (err) {
//   console.log(err);
// });
var createcmd={};
createcmd.cmd='./environment.sh';
createcmd.options={cwd:'environments'};
var GitHook = require('git-web-hook');
var gitlab = GitHook({
    "logger": console,
    "host": "0.0.0.0",
    "port": 3420,
    "enableHealthcheck":true
});

gitlab.listen();

gitlab.on('push', function (repo,data,post) {
    var refs=data.split('/');
    var last=data.split('/').pop();
    console.log(repo,data,post);
    
    createcmd.parameters=['create',last,repo]
    /**
     * BUILD ENVIRONMENT NAME=last with TYPE=repo
     */
    cmd(createcmd.cmd,createcmd.parameters,createcmd.options);
    
    
});



const spawn = require('child_process').spawn;

function cmd(command,parameters,options) {
    parameters=parameters||[];    
    options=options||{};    
    const mycmd = spawn(command,parameters,options);
    
    

    mycmd.stdout.on('data', (data) => {
        console.log('------------------------------------------------');
        console.log(`stdout:${command} ${parameters} \n${data}`.green);
    });

    mycmd.stderr.on('data', (data) => {
        console.log(`stderr:${command} ${parameters} \n${data}`.red);
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


# Automated GitFlow Docker Environments
## Orchestation solution for automated gitflow matching environments

The goal of this project is to have an environment to run test & show for every branch of the git or git-flow process http://nvie.com/posts/a-successful-git-branching-model/

So wvery time a new branch, feature, hotfix or release is created in the main repository a Docker environment is created for that branch.
Then you will have a complete environment based on a docker-compose
ie: http://feature_buttons.my.domain.me 
where feature_buttons is the name of the feature you are developing

Moving Parts:

* 1 docker & docker-compose

* 2 A GIT repository with a docker-compose.yml and helper files (configs, assets, etc) needed to create an environment

* 3 A GIT server with webhooks: github, gitlab, or any other: this server will fire the events to listen daemons to create update or destroy the environments

* 4 A Daemon or web app listening to webhooks events. This app will convert events to actions to Create Update Destroy environments for any new or existing branch

* 5 A BASH Script for Create Update & Destroy environments based on point 2

* 6 A reverse proxy NGINX with docker virtual hosts.
* 6.1 an FQDN domain with unlimited subdomains, probably *.my.domain.me -> some IP
* 6.2 * Optional:  a DNS Gen capable of mapping VIRTUALHOST environment variable
* 7 OPTIONAL a local docker registry proxy caché.
* 8 OPTIONAL a local apt package caché apt-catcher for debian derivatives to have faster provisioning setup and updates
* 9 OPTIONAL some container management app (I choose portainer)
* 10 OPTIONAL A container monitoring tool

NOTE: 
I'm a linux type of person so all the above is suposed to be installed on a linux server or some type of linux container
### STEP 1 
Install docker and docker-compose

https://docs.docker.com/compose/install/


### STEP 2 
create a git repository wich will create and manage your web app environment
Here you will have a docker-compose.yml with the services needed to run your app.

Your docker-compose.yml could be as simple as a single container running hello-world (https://hub.docker.com/r/tutum/hello-world/ ) to a full featured web and ifraestructure environment including:
*  app servers:Nodejs, Apache, Nginx, Lighthttpd, etc.
* Databases: Mongo, Couchdb, MariaDB (mysql) etc.
* db admninistration tools: phpmyadmin, adminer etc.
* Included web based IDE: Cloud9 IDE,Eclipse Che, Codiad
* Message Queues: RabbitMQ, ActiveMQ

for simplicity we will setup a trivial webapp with only a helloworld but more complex scenarios will be discussed later.


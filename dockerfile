FROM node

#### START daemon install
RUN git clone https://github.com/juanitomint/automated-gitflow-docker-environments-git-hook-daemon.git

WORKDIR /automated-gitflow-docker-environments-git-hook-daemon

RUN npm install 

CMD node index.js
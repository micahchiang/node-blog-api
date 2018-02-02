FROM node:carbon
# Create app directory
WORKDIR /usr/scr/app
# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY setenvvars.sh /
RUN chmod +x /setenvvars.sh
ENTRYPOINT ["/setenvvars.sh"]
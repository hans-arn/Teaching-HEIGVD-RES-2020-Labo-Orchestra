FROM node:12.16

RUN apt-get update && \ 
	apt-get install -y vim

CMD ["npm", "install","dgram", "moment"]
COPY src/ /opt/app/
RUN ["node", "/opt/app/index.js"]

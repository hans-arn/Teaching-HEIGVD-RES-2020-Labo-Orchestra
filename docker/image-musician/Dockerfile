FROM node:12.16

RUN apt-get update && \ 
	apt-get install -y vim

CMD ["npm", "install","dgram"]
COPY src/ /opt/app/
ENTRYPOINT ["node", "/opt/app/index.js"]
CMD ["piano"]

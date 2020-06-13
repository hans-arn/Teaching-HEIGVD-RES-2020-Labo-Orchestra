FROM node:12.16

CMD ["npm", "install","dgram", "uuid", "--save"]
COPY src/ /opt/app/
ENTRYPOINT ["node", "/opt/app/index.js"]
CMD ["piano"]

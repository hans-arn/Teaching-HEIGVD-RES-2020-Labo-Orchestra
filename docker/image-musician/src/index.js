'use strict';
const uuid = require('uuid');
const dgram = require('dgram');

// network
var client = dgram.createSocket("udp4");
const PORT = 20000;
const MULTICAST_ADDR = "233.255.255.255";

// data storage
var musician = {uuid:uuid.v4(), instrument:"", sound:""};
const typeMusician = new Map();
typeMusician.set('piano', 'ti-ta-ti')
typeMusician.set('trumpet', 'pouet')
typeMusician.set('flute', 'trulu')
typeMusician.set('violin', 'gzi-gzi')
typeMusician.set('drum', 'boum-boum')


client.bind(PORT);

/**
 * envoi du son sur le port 20000
 */
function send() {
  	const message = Buffer.from(JSON.stringify(musician,null,"\t"));
  	client.send(message, 0, message.length, PORT, MULTICAST_ADDR);
}

/*
 * envoi du message toutes les secondes 
 */
function SendMessage(){
	setInterval(send, 1000);
}

// initialisation avec les arguments docker 
musician.sound=typeMusician.get(process.argv[2])
musician.instrument=process.argv[2] ;
SendMessage();

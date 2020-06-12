'use strict';
const uuid = require('uuid');
const dgram = require('dgram');

var musician = {uuid:uuid.v4(), instrument:"", sound:""};
var client = dgram.createSocket("udp4");
const PORT = 20000;
const MULTICAST_ADDR = "233.255.255.255";

const typeMusician = {
	'piano' : 'ti-ta-ti',
	'trumpet' : 'pouet',
	'flute' : 'trulu',
	'violin' : 'gzi-gzi',
	'drum' : 'boum-boum'
}

client.bind(PORT);

if (process.argv.length - 2 != 1) {
  	console.error("Too many or too few arguments!");
  	return;
}

function send() {
  	const message = Buffer.from(JSON.stringify(musician,null,"\t"));
  	client.send(message, 0, message.length, PORT, MULTICAST_ADDR, function() {
    	console.info(musician.sound);
  	});
}

function SendMessage(){
	setInterval(send, 1000);
}

function init(instrument) { 
	musician.sound=typeMusician[instrument]
	musician.instrument=instrument;
	SendMessage();
	console.info(instrument);
} 
init(process.argv[2]);

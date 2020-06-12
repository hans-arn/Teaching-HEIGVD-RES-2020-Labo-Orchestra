'use strict';
var dgram = require('dgram');
var musician = {uuid:"", instrument:"", sound:""};
var client = dgram.createSocket("udp4");
const PORT = 20000;
const MULTICAST_ADDR = "233.255.255.255";

const typeMusician = {
	piano : 'ti-ta-ti',
	trumpet : 'pouet',
	flute : 'trulu',
	violin : 'gzi-gzi',
	drum : 'boum-boum'
}

client.bind(PORT);

if (process.argv.length - 2 != 1) {
  	console.error("Too many or too few arguments!");
  	return;
}

function sendMessage() {
  	const message = Buffer.from(JSON.stringify(musician,null,"\t"));
  	client.send(message, 0, message.length, PORT, MULTICAST_ADDR, function() {
    	console.info(`Sending message`);
  	});
}

function SendMessage(){
	function printMessage(){
		//console.log(JSON.stringify(musician,null,"\t"));
		sendMessage();
	};
	printMessage();
	setInterval(printMessage, 1000);

}

function uuidv4() { 
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
		function(c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); 
			return v.toString(16); 
		}); 
} 

function init(instrument) { 
	musician.sound=typeMusician[instrument]
	musician.instrument=instrument;
	musician.uuid=uuidv4();
	SendMessage();
} 
init(process.argv[2]);

'use strict';
var dgram = require('dgram');
var musician = {uuid:"", instrument:"", firstSeen:"", lastSeen:""};
var server = dgram.createSocket("udp4");
const PORT = 20000;

let musicians = new Map()

const typeSound = {
	'ti-ta-ti' : 'piano',
	'pouet' : 'trumpet',
	'trulu' : 'flute',
	'gzi-gzi' :'violin',
	'boum-boum' : 'drum'
}

server.bind(PORT, () => {
	console.log("Joining the orchestra");
	server.addMembership("233.255.255.255");
});

server.on('message', function(msg, rinfo) {
	var tmp = JSON.parse(msg);
	if(!musicians.has(tmp.uuid)){
		var now = new Date();
		var musician = {uuid:tmp.uuid, instrument:typeSound[tmp.sound], firstSeen:now.getTime(), lastSeen:""};
		musicians.set(tmp.uuid,musician);
	}
	console.log(musicians)
});

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('listening', () => {
	console.log(`server listening`);
});

function init(instrument) { 
	musician.instrument=instrument;
} 

init("piano");

'use strict';
const dgram = require('dgram');
const moment = require('moment');

var musician = {uuid:"", instrument:"", ActiveSince: "",firstSeen:"", lastSeen:""};
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
		var musician = {
			uuid:tmp.uuid, instrument:typeSound[tmp.sound], ActiveSince: moment().format(), firstSeen:actualtimeSeconds(), lastSeen:actualtimeSeconds()
		};
		musicians.set(tmp.uuid,musician);
	}else{
		var musician = musicians.get(tmp.uuid)
		musician.lastSeen = actualtimeSeconds();
		musicians.set(tmp.uuid,musician);
	}
	console.log(musicians)
});

server.on('listening', () => {
	console.log(`server listening`);
});

function actualtimeSeconds(){
	var now = new Date();
	return Math.floor(now.getTime()/1000);
}

function init(instrument) { 
	musician.instrument=instrument;
} 

init("piano");

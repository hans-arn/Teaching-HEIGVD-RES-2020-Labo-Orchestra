'use strict';
const dgram = require('dgram');
const moment = require('moment');
const net = require('net');

var server = dgram.createSocket("udp4");
const PORT = 20000;

const port = 2205;

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
	//console.log(musicians)
});

server.on('listening', () => {
	console.log(`server listening`);
});

function actualtimeSeconds(){
	var now = new Date();
	return Math.floor(now.getTime()/1000);
}


const serverTcp = net.createServer();
serverTcp.listen(port, () => {
    console.log('TCP Server is running on port ' + port +'.');
});

serverTcp.on('connection', function(sock) {
    //console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    let userInfos = new Array();
	for (let [uuid,m] of musicians.entries()) {
	  	userInfos.push({
		  uuid: uuid,
		  instrument: m.instrument,
		  activeSince: m.ActiveSince
		});
		console.log(m);
	}
		
    // Write the data back to all the connected, the client will receive it as data from the server
    sock.write(JSON.stringify(userInfos));
    sock.end();
});

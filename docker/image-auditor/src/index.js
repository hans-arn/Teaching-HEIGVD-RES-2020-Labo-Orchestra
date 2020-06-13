'use strict';
const dgram = require('dgram');
const moment = require('moment');
const net = require('net');

// network 
var server = dgram.createSocket("udp4");
const PORT = 20000;
const port = 2205;

// data storing
var musicians = new Map();
const typeSound = new Map();
typeSound.set('ti-ta-ti', 'piano')
typeSound.set('pouet', 'trumpet')
typeSound.set('trulu', 'flute')
typeSound.set('gzi-gzi', 'violin')
typeSound.set('boum-boum', 'drum')

/**
 * connection pour la paquets UDP envoyé par les musiciens 
 */
server.bind(PORT, () => {
	console.log("Joining the orchestra");
	server.addMembership("233.255.255.255");
});

/**
 * traitement des paquets UDP envoyés par les musiciens
 */
server.on('message', function(msg, rinfo) {
	var tmp = JSON.parse(msg);
	
	// si le musicien est nouveau, on l'ajoute à la map
	if(!musicians.has(tmp.uuid)){
		var musician = {
			uuid:tmp.uuid, 
			instrument:typeSound.get(tmp.sound), 
			ActiveSince: moment().format(),  
			lastSeen:actualtimeSeconds()
		};
		musicians.set(tmp.uuid,musician);
	}else{
	// sinon on uptade le temps de la dernière vue
		var musician = musicians.get(tmp.uuid)
		musician.lastSeen = actualtimeSeconds();
		musicians.set(tmp.uuid,musician);
	}
});

/**
 * écoute de nouvelle connexion
 */
server.on('listening', () => {
	console.log(`server listening`);
});

/**
 * donne l'heure système actuelle en seconde 
 */
function actualtimeSeconds(){
	var now = new Date();
	return Math.floor(now.getTime()/1000);
}

/**
 * écoute de connexion sur le port 2205
 */
const serverTcp = net.createServer();
serverTcp.listen(port, () => {
    console.log('TCP Server is running on port ' + port +'.');
});

/**
 * envoie les musiciens actifs lors d'une connexion sur le port 2205
 */
serverTcp.on('connection', function(sock) {
    let userInfos = new Array();
	for (let [uuid,m] of musicians.entries()) {
		if(actualtimeSeconds() - m.lastSeen < 5){
		  	userInfos.push({
			  uuid: uuid,
			  instrument: m.instrument,
			  activeSince: m.ActiveSince
			});
		}else{
			musicians.delete(uuid);
		}
	}
	console.log(userInfos);
    // Write the data back to all the connected, the client will receive it as data from the server
    sock.write(JSON.stringify(userInfos));
    sock.end();
});

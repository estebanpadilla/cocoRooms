/**
* @name Reply
* @extends
* @file reply.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class Reply {
	constructor(key, body, user, timestamp) {
		this.key = key;
		this.body = body;
		this.user = user;
		this.timestamp = timestamp;
	}
}
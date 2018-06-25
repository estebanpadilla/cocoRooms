/**
* @name Post
* @extends
* @file post.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class Post {
	constructor(key, title, body, replies, user, timestamp) {
		this.key = key;
		this.title = title;
		this.body = body;
		this.replies = replies;
		this.user = user;
		this.timestamp = timestamp;
	}
}
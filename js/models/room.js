/**
* @name Room
* @extends 
* @file room.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class Room {
	constructor(key, title, description, posts, users, timestamp, user) {
		this.key = key;
		this.title = title;
		this.description = description;
		this.posts = posts;
		this.users = users;
		this.timestamp = timestamp;
		this.user = user;
		this.isChanged = false;
	}

	addUser(key) {
		if (!this.isUserInRoom(key)) {
			if (this.users) {
				this.users.push(key);
			} else {
				this.users = [];
				this.users.push(key);
			}
		}
	}

	removeUser(key) {
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i] === key) {
				this.users.splice(i, 1);
			}
		}
	}

	//Checks if user is already in the room.
	isUserInRoom(key) {
		var value = false;
		if (this.users) {
			this.users.forEach(userInRoom => {
				if (key === userInRoom) {
					value = true;
				}
			});
		}
		return value;
	}
}
/**
* @name Room
* @extends 
* @file room.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class Room {
	constructor(key, title, description, posts, users, timestamp) {
		this.key = key;
		this.title = title;
		this.description = description;
		this.posts = posts;
		this.users = users;
		this.timestamp = timestamp;
	}

	addUser(user) {
		if (!this.isUserInRoom(user)) {
			if (this.users) {
				this.users.push(user);
			} else {
				this.users = [];
				this.users.push(user);
			}
		}
	}

	removeUser(user) {
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].userName === user.userName) {
				this.users.splice(i, 1);
			}
		}
	}

	//Checks if user is already in the room.
	isUserInRoom(user) {
		var value = false;
		if (this.users) {
			this.users.forEach(userInRoom => {
				if (user.userName === userInRoom.userName) {
					value = true;
				}
			});
		}
		return value;
	}
}
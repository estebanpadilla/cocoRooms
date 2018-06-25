/**
* @name DataManager
* @extends
* @file dataManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class DataManager {
	/**
	* @param {data type} name - description.
	*/
	constructor() {
		this.user = null;
		this.selectedRoom = null;
		this.users = [];
		this.rooms = [];
		this.addUsers();
		this.addRooms();
	}

	addUsers() {
		var epadilla = new User('Esteban', 'Padilla', 'epadilla', 'ps', true);
		this.users.push(epadilla);
		var jperez = new User('Juan', 'Perez', 'jperez', 'ps', false);
		this.users.push(jperez);
		var jsmith = new User('Jhon', 'Smith', 'jsmith', 'ps', false);
		this.users.push(jsmith);
		var asanchez = new User('Amanda', 'Sanchez', 'asanchez', 'ps', false);
		this.users.push(asanchez);
		var jgomes = new User('Juan', 'Gomes', 'jgomes', 'ps', false);
		this.users.push(jgomes);
		var ftrejos = new User('Frank', 'Trejos', 'ftrejos', 'ps', false);
		this.users.push(ftrejos);

		this.user = epadilla;
	}

	addRooms() {

		var replies = [];
		for (let i = 0; i < 4; i++) {
			var reply = new Reply('--' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, this.users[i], Date.now());
			replies.push(reply);
		}

		var posts = [];
		for (let i = 0; i < 10; i++) {
			var post = new Post('--' + i, 'Title ' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, replies, this.users[i], Date.now());
			posts.push(post);
		}


		var room1 = new Room('--1', 'Programando con Javascript', 'Para todos lo que quieren empezar a aprender a programar con javascript.', posts, [this.users[0], this.users[1], this.users[2], this.users[3], this.users[4], this.users[5]], Date.now());
		this.rooms.push(room1);

		posts = [];
		for (let i = 0; i < 10; i++) {
			var post = new Post('--' + i, 'Title ' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, replies, this.users[i], Date.now());
			posts.push(post);
		}

		var room2 = new Room('--2', 'Programación Dinamica', 'Para todos lo que quieren empezar a aprender a programar con javascript.', posts, [this.users[0], this.users[2], this.users[3], this.users[5]], Date.now());
		this.rooms.push(room2);

	}

	validateUser(userName, password) {
		var value = false;
		this.users.forEach(user => {
			if (user.userName === userName) {
				this.user = user;
				value = true;

			}
		});
		return value;
	}

	addRoom(value) {
		this.rooms.push(value);
	}

	updateRoom(value) {
		this.rooms.forEach(room => {
			if (room.key === value.key) {
				room = value;
			}
		});
	}

	deleteRoom(value) {
		for (let i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].key === value.key) {
				this.rooms.splice(i, 1);
			}
		}
	}

	addUser(value) {
		this.users.push(value);
	}

	updateUser(value) {
		this.users.forEach(user => {
			if (user.userName === value.userName) {
				user = value;
			}
		});
	}

	deleteUser(value) {

		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].userName === value.userName) {
				this.users.splice(i, 1);
			}
		}

		this.rooms.forEach(room => {
			for (let i = 0; i < room.users.length; i++) {
				if (room.users[i].userName === value.userName) {
					room.users.splice(i, 1);
				}
			}
		});
	}

	addPost(value) {
		this.selectedRoom.posts.push(value);
	}

	updatePost(value) {

	}

	deletePost(value) {
		for (let i = 0; i < this.selectedRoom.posts.length; i++) {
			if (this.selectedRoom.posts[i].key === value.key) {
				this.selectedRoom.posts.splice(i, 1);
			}
		}
	}
}
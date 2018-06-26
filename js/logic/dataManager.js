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
	constructor(app) {
		this.app = app;
		this.user = null;
		this.selectedRoom = null;
		this.users = [];
		this.rooms = [];
		this.addUsers();
		// this.addRooms();
		this.app.netManager.getUsers();
		this.app.netManager.getRooms();
	}

	//Temporal data methods
	addUsers() {
		var epadilla = new User('Esteban', 'Padilla', 'epadilla', 'epadilla', true);
		this.users.push(epadilla);
		var jperez = new User('Juan', 'Perez', 'jperez', 'jperez', false);
		this.users.push(jperez);
		var jsmith = new User('Jhon', 'Smith', 'jsmith', 'jsmith', false);
		this.users.push(jsmith);
		var asanchez = new User('Amanda', 'Sanchez', 'asanchez', 'asanchez', false);
		this.users.push(asanchez);
		var jgomes = new User('Juan', 'Gomes', 'jgomes', 'jgomes', false);
		this.users.push(jgomes);
		var ftrejos = new User('Frank', 'Trejos', 'ftrejos', 'ftrejos', false);
		this.users.push(ftrejos);

		this.user = epadilla;
	}

	addRooms() {

		var posts = [];
		for (let i = 0; i < 10; i++) {

			var replies = [];
			for (let i = 0; i < 4; i++) {
				var reply = new Reply('--' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, this.users[i], Date.now());
				replies.push(reply);
			}

			var post = new Post('--' + i, 'Title ' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, replies, this.users[i], Date.now());
			posts.push(post);
		}

		var room1 = new Room('--1', 'Programando con Javascript', 'Para todos lo que quieren empezar a aprender a programar con javascript.', posts, [this.users[0], this.users[1], this.users[2], this.users[3], this.users[4], this.users[5]], Date.now());
		this.rooms.push(room1);

		posts = [];
		for (let i = 0; i < 4; i++) {
			var replies = [];
			for (let i = 0; i < 4; i++) {
				var reply = new Reply('--' + i, 'The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to Window.localStorage; the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends.' + i, this.users[i], Date.now());
				replies.push(reply);
			}

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

	//Room Methods
	addRoom(value) {
		this.app.netManager.postRoom(value);
	}

	updateRoom(value) {
		if (value) {
			this.app.netManager.updateRoom(value);
		} else {
			this.app.netManager.updateRoom(this.selectedRoom);
		}
	}

	deleteRoom(value) {
		this.app.netManager.deleteRoom(value);
	}

	//User Methods
	addUser(value) {
		// this.users.push(value);
		this.app.netManager.postUser(value);
		// this.app.navManager.refresh();
	}

	updateUser(value) {
		this.users.forEach(user => {
			if (user.userName === value.userName) {
				user = value;
			}
		});

		this.app.navManager.refresh();
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
					//Send to update room user is removed and is on room
				}
			}
		});

		this.app.netManager.deleteUser(value);
		// this.app.navManager.refresh();
	}

	//Post Methods
	addPost(value) {
		if (this.selectedRoom.posts) {
			value.key = this.selectedRoom.posts.length;
			this.selectedRoom.posts.push(value);
			this.app.netManager.updateRoom(this.selectedRoom);
		} else {
			value.key = 0;
			this.selectedRoom.posts = [];
			this.selectedRoom.posts.push(value);
			this.app.netManager.updateRoom(this.selectedRoom);
		}
	}

	updatePost(value) {
		this.app.netManager.updateRoom(this.selectedRoom);
	}

	deletePost(value) {
		for (let i = 0; i < this.selectedRoom.posts.length; i++) {
			if (this.selectedRoom.posts[i].key === value.key) {
				this.selectedRoom.posts.splice(i, 1);
				this.app.netManager.updateRoom(this.selectedRoom);
			}
		}
	}

	getUserFullName(value) {
		var fullName = '';
		this.users.forEach(user => {
			if (user.key === value) {
				fullName += user.name + ' ' + user.lastName;
			}
		});
		return fullName;
	}

	//Method is use to check value(user) agains current user.
	isMine(value) {
		if (this.user.key === value) {
			return true;
		}
		return false;
	}
}
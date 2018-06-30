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
		// this.addUsers();
		// this.addRooms();
		this.app.netManager.getUsers();
		this.app.netManager.getRooms();
	}

	//Temporal data methods
	addUsers() {
		var epadilla = new User('Esteban', 'Padilla', 'epadilla', 'epadilla', true);

		this.user = epadilla;
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
		this.app.netManager.updateUser(value);
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

	getRoomByKey(key) {
		for (let i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].key === key) {
				return this.rooms[i];
			}
		}
		return null;
	}

	validateURL(url) {
		var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		if (pattern.test(url)) {
			return true;
		}
		return false;
	}
}
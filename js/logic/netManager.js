/**
* @name NetManager
* @extends
* @file netManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NetManager {
	/**
	* @param {data type} name - description.
	*/
	constructor(app) {
		this.app = app;
		this.url = 'https://cocoroom-cr.firebaseio.com/';
	}

	getRoomsCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var data = request.response;
				var rooms = JSON.parse(data);
				this.app.dataManager.rooms = [];

				for (const key in rooms) {

					var posts = [];
					if (rooms[key].posts) {
						for (const id in rooms[key].posts) {
							var postData = rooms[key].posts[id];
							var replies = [];

							if (postData.replies) {
								for (const replyKey in postData.replies) {
									var replyData = postData.replies[replyKey];
									var reply = new Reply(replyKey, replyData.body, replyData.user, new Date(replyData.timestamp));
									replies.push(reply);
								}
							}

							var post = new Post(Number(id), postData.title, postData.body, replies, postData.user, new Date(postData.timestamp));
							posts.push(post);
						}
					}

					var room = new Room(key, rooms[key].title, rooms[key].description, posts, rooms[key].users, new Date(rooms[key].timestamp), rooms[key].user, rooms[key].color);
					this.app.dataManager.rooms.push(room);
				}

				this.app.navManager.refresh();

			}
		}
	}

	getRooms() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'rooms.json', true);
		request.onreadystatechange = this.getRoomsCallback.bind(this);
		request.send();
	}

	roomsCallback(e) {
		var request = e.target;
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				this.getRooms();
			}
		}
	}

	postRoom(value) {
		value.key = null;
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'rooms.json', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.roomsCallback.bind(this);
		request.send(JSON.stringify(value));
	}

	deleteRoom(value) {
		var path = (this.url + 'rooms/' + value.key + '.json');
		var request = new XMLHttpRequest();
		request.open('DELETE', path, true);
		request.onreadystatechange = this.roomsCallback.bind(this);
		request.send();
	}

	updateRoom(value) {
		var request = new XMLHttpRequest();
		request.open('PATCH', (this.url + 'rooms.json'), true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.roomsCallback.bind(this);
		// var key = value.key;
		// value.key = null
		value.isChanged = null;
		var room = '{' + JSON.stringify(value.key) + ':' + JSON.stringify(value) + '}';
		request.send(room);
	}

	getUsersCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var data = request.response;
				var users = JSON.parse(data);
				this.app.dataManager.users = [];

				for (const key in users) {
					var user = new User(key, users[key].name, users[key].lastName, users[key].userName, users[key].password, users[key].isAdmin);
					this.app.dataManager.users.push(user);
				}

				this.app.dataManager.user = this.app.dataManager.users[0];

				this.app.navManager.refresh();

			}
		}
	}

	getUsers() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'users.json', true);
		request.onreadystatechange = this.getUsersCallback.bind(this);
		request.send();
	}

	usersCallback(e) {
		var request = e.target;
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				this.getUsers();
			}
		}
	}

	postUser(value) {
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'users.json', true);
		request.setRequestHeader('Content-Type', 'applicaction/json;charset=utf-8');
		request.onreadystatechange = this.usersCallback.bind(this);
		request.send(JSON.stringify(value));

	}

	deleteUser(value) {
		var request = new XMLHttpRequest();
		var path = this.url + 'users/' + value.key + '.json';
		request.open('DELETE', path, true);
		request.onreadystatechange = this.usersCallback.bind(this);
		request.send();
	}

	updateUser(value) {
		var request = new XMLHttpRequest();
		var path = this.url + 'users.json';
		request.open('PATCH', path, true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.usersCallback.bind(this);
		var user = '{' + JSON.stringify(value.key) + ':' + JSON.stringify(value) + '}';
		request.send(user);
	}

}
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

					var room = new Room(key, rooms[key].title, rooms[key].description, rooms[key].posts, rooms[key].users, rooms[key].timestamp);
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
		var key = value.key;
		value.key = null
		var room = '{' + JSON.stringify(key) + ':' + JSON.stringify(value) + '}';
		request.send(room);
	}

	usersCallback(e) {
		this.app.navManager.refresh();
	}

	postUser(value) {
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'users.json', true);
		request.setRequestHeader('Content-Type', 'applicaction/json;charset=utf-8');
		request.onreadystatechange = this.usersCallback.bind(this);
		request.send(JSON.stringify(value));

	}


}
/**
* @name RoomsView
* @extends View
* @file roomsUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class RoomsView extends View {
	/**
	* @param {data type} name - description.
	*/
	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
		this.scrollToBottom = false;
	}

	addUI() {
		this.container.className = 'roomsContainer';

		this.addBtn = document.createElement('i');
		this.addBtn.className = 'material-icons';
		this.addBtn.classList.add('addBtn');
		this.addBtn.innerHTML = 'add_circle';
		this.addBtn.onclick = this.addBtnClick.bind(this);
		this.addBtn.hidden = !this.app.dataManager.user.isAdmin;

		this.container.appendChild(this.addBtn);

		// this.addRoomUI = new AddRoomUI(null, this.container, this.app);

		this.addRooms();

		this.bottom = document.createElement('p');
		this.bottom.className = 'roomsView_bottom';
		this.bottom.innerHTML = 'Use the add button to create a new room';
		this.container.appendChild(this.bottom);

		if (this.scrollToBottom) {
			window.scroll({
				left: 0,
				top: this.container.scrollHeight
			});
		}

		this.scrollToBottom = false;
	}

	addRooms() {
		this.app.dataManager.rooms.forEach(room => {
			// if (room.isUserInRoom(this.app.dataManager.user.key) || this.app.dataManager.user.isAdmin) {
			var roomUI = new RoomUI(room, this.container, this.app);
			// }
		});
	}

	addBtnClick(e) {
		this.scrollToBottom = true;
		var room = new Room(null, 'Title', 'Description', [], [], Date.now(), this.app.dataManager.user.key, '#cfd8dc');
		room.addUser(this.app.dataManager.user.key);
		this.app.dataManager.addRoom(room);
	}

	updatingRoom(value) {
		this.addRoomUI.updatingRoom(value);
	}
}
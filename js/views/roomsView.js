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
	}

	addUI() {
		this.container.className = 'roomsContainer';

		this.addBtn = document.createElement('button');
		this.addBtn.className = 'addBtn';
		this.addBtn.innerHTML = 'ADD';
		this.addBtn.onclick = this.addBtnClick.bind(this);
		this.addBtn.hidden = !this.app.dataManager.user.isAdmin;

		this.container.appendChild(this.addBtn);

		this.addRoomUI = new AddRoomUI(null, this.container, this.app);

		this.addRooms();
	}

	addRooms() {
		this.app.dataManager.rooms.forEach(room => {
			var roomUI = new RoomUI(room, this.container, this.app);
		});
	}

	addBtnClick(e) {
		this.addRoomUI.show();
	}

	updatingRoom(value) {
		this.addRoomUI.updatingRoom(value);
	}
}
/**
* @name RoomUI
* @extends View
* @file roomUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class RoomUI extends View {
	/**
	* @param {data type} name - description.
	*/
	constructor(model, parent, app) {
		super(model, parent, app);

		this.addUI();
	}

	addUI() {
		this.container.className = 'roomContainer';

		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('p');
		this.userTxt = document.createElement('p');
		this.timestampTxt = document.createElement('p');
		this.usersBtn = document.createElement('button');
		this.updateBtn = document.createElement('button');
		this.deleteBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.top.appendChild(this.userTxt);
		this.top.appendChild(this.timestampTxt);
		this.bottom.appendChild(this.usersBtn);
		this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);

		this.titleTxt.innerHTML = this.model.title;
		this.descriptionTxt.innerHTML = this.model.description;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user);
		this.timestampTxt.innerHTML = this.model.timestamp;
		this.usersBtn.innerHTML = 'USERS';
		this.updateBtn.innerHTML = 'UPDATE';
		this.deleteBtn.innerHTML = 'DELETE';

		this.usersBtn.className = 'usersBtn';
		this.usersBtn.hidden = !this.app.dataManager.user.isAdmin;
		this.updateBtn.hidden = !this.app.dataManager.user.isAdmin;
		this.deleteBtn.hidden = !this.app.dataManager.user.isAdmin;

		this.top.onclick = this.onclick.bind(this);
		this.usersBtn.onclick = this.usersBtnClick.bind(this);
		this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);
	}

	onclick(e) {
		this.app.dataManager.selectedRoom = this.model;
		this.app.navManager.goto('room');
	}

	usersBtnClick(e) {
		this.app.dataManager.selectedRoom = this.model;
		this.app.navManager.goto('users');
	}

	updateBtnClick(e) {
		this.app.navManager.updatingRoom(this.model);
	}

	deleteBtnClick(e) {
		if (confirm('Are you sure?')) {
			this.app.dataManager.deleteRoom(this.model);
			this.app.navManager.refresh();
		}
	}
}
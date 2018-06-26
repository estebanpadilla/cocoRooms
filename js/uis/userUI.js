/**
* @name UserUI
* @extends View
* @file userUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class UserUI extends View {

	constructor(model, parent, app) {
		super(model, parent, app);

		this.isInRoom = false;
		this.container.className = 'userContainer';

		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.nameTxt = document.createElement('h1');
		this.userNameTxt = document.createElement('p');
		this.addToRoomBtn = document.createElement('button');
		this.updateBtn = document.createElement('button');
		this.deleteBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.nameTxt);
		this.top.appendChild(this.userNameTxt);
		this.bottom.appendChild(this.addToRoomBtn);
		this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);

		this.nameTxt.innerHTML = model.name + ' ' + model.lastName;
		this.userNameTxt.innerHTML = model.userName;

		this.addToRoomBtn.innerHTML = 'ADD TO ROOM';
		this.updateBtn.innerHTML = 'UPDATE';
		this.deleteBtn.innerHTML = 'DELETE';

		this.addToRoomBtn.onclick = this.addToRoomBtnClick.bind(this);
		this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);

		this.markAsRemoved();
		this.toogle();
	}

	toogle() {
		if (this.app.dataManager.selectedRoom.users) {
			this.app.dataManager.selectedRoom.users.forEach(roomUser => {
				if (this.model.userName === roomUser.userName) {
					this.markAsAdded();
				}
			});
		}
	}

	addToRoomBtnClick(e) {

		if (this.isInRoom) {
			this.markAsRemoved();
			this.app.dataManager.selectedRoom.removeUser(this.model)
		} else {
			this.app.dataManager.selectedRoom.addUser(this.model)
			this.markAsAdded();
		}
	}

	updateBtnClick(e) {
		this.app.navManager.updatingUser(this.model);
	}

	deleteBtnClick(e) {
		this.app.dataManager.deleteUser(this.model);
		this.app.navManager.refresh();
	}

	markAsRemoved() {
		this.isInRoom = false;
		this.container.classList.remove('markAsSelected');
		this.addToRoomBtn.innerHTML = 'ADD TO ROOM';
	}

	markAsAdded() {
		this.isInRoom = true;
		this.container.classList.add('markAsSelected');
		this.addToRoomBtn.innerHTML = 'REMOVE TO ROOM';
	}
}

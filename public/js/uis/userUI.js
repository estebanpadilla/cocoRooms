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

		this.addUI()
	}

	addUI() {

		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.nameTxt = document.createElement('h1');
		this.userNameTxt = document.createElement('p');
		this.addToRoomBtn = document.createElement('i');
		this.updateBtn = document.createElement('i');
		this.deleteBtn = document.createElement('i');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.nameTxt);
		this.top.appendChild(this.userNameTxt);
		this.bottom.appendChild(this.addToRoomBtn);
		this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);

		this.nameTxt.innerHTML = this.model.name + ' ' + this.model.lastName;
		this.userNameTxt.innerHTML = this.model.userName;

		this.updateBtn.innerHTML = 'edit';
		this.deleteBtn.innerHTML = 'delete';

		this.container.className = 'userContainer';
		this.bottom.className = 'bottomContainer';
		this.addToRoomBtn.className = 'material-icons';
		this.updateBtn.className = 'material-icons';
		this.deleteBtn.className = 'material-icons';

		this.addToRoomBtn.classList.add('iconBtn');
		this.updateBtn.classList.add('iconBtn');
		this.deleteBtn.classList.add('iconBtn');

		this.addToRoomBtn.onclick = this.addToRoomBtnClick.bind(this);
		this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);

		if (this.model.isAdmin) {
			this.bottom.removeChild(this.deleteBtn);
		}

		this.markAsRemoved();
		this.toogle();
	}

	toogle() {
		if (this.app.dataManager.selectedRoom.users) {
			this.app.dataManager.selectedRoom.users.forEach(key => {
				if (this.model.key === key) {
					this.markAsAdded();
				}
			});
		}
	}

	addToRoomBtnClick(e) {
		if (this.isInRoom) {
			this.markAsRemoved();
			this.app.dataManager.selectedRoom.removeUser(this.model.key)
		} else {
			this.app.dataManager.selectedRoom.addUser(this.model.key)
			this.markAsAdded();
		}

		this.app.dataManager.selectedRoom.isChanged = true;
	}

	updateBtnClick(e) {
		this.app.navManager.updatingUser(this.model);
	}

	deleteBtnClick(e) {
		if (confirm('Are you sure?')) {
			this.app.dataManager.deleteUser(this.model);
		}
	}

	//Room relationship methods
	markAsRemoved() {
		this.isInRoom = false;
		// this.container.classList.remove('markAsSelected');
		this.container.style.backgroundColor = '#cfd8dc';
		this.addToRoomBtn.innerHTML = 'person_add';
	}

	markAsAdded() {
		this.isInRoom = true;
		this.container.style.backgroundColor = this.app.dataManager.selectedRoom.color;
		// this.container.classList.add('markAsSelected');
		this.addToRoomBtn.innerHTML = 'person';
	}
}

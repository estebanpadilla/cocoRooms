/**
* @name NavManager
* @extends
* @file navManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NavManager {

	constructor(app) {

		this.app = app;
		this.mainContainer = document.getElementById('mainContainer');

		this.backBtn = document.getElementById('backBtn');
		this.backBtn.onclick = this.back.bind(this);

		this.view = null;
		this.current = 'rooms';
		this.previous = 'none';
		// this.selectedRoom = null;
	}

	init() {
		if (this.app.dataManager.user) {
			this.goto('rooms');
		} else {
			this.goto('login');
		}
	}

	goto(view) {

		this.showBackBtn();
		this.previous = this.current;
		this.current = view;

		if (this.view) {
			this.view.delete();
		}

		switch (this.current) {
			case 'room':
				this.view = new RoomView(this.app.dataManager.selectedRoom, this.mainContainer, this.app);
				document.getElementById('navigationBarTitle').innerHTML = this.app.dataManager.selectedRoom.title;
				break;
			case 'rooms':
				this.app.dataManager.selectedRoom = null;
				this.view = new RoomsView(null, this.mainContainer, this.app);
				document.getElementById('navigationBarTitle').innerHTML = 'ROOMS';
				this.hideBtn();
				break;
			case 'login':
				this.view = new LoginView(null, mainContainer, this.app);
				document.getElementById('navigationBarTitle').innerHTML = 'LOGIN';
				this.hideBtn();
				break;
			case 'users':
				this.view = new UsersView(this.app.dataManager.users, this.mainContainer, this.app);
				document.getElementById('navigationBarTitle').innerHTML = 'USERS';
				break;
			default:
				break;
		}
	}

	back() {
		if (this.app.dataManager.selectedRoom && this.app.dataManager.selectedRoom.isChanged) {
			this.app.dataManager.updateRoom(this.app.dataManager.selectedRoom);
		}
		this.goto(this.previous);
	}

	refresh() {
		this.view.refresh();
	}

	showBackBtn() {
		this.backBtn.hidden = true;
		this.backBtn.innerHTML = 'arrow_back_ios';
	}

	hideBtn() {
		this.backBtn.hidden = false;
		this.backBtn.innerHTML = '';
	}

	//Room methods
	updatingRoom(value) {
		this.view.updatingRoom(value);
	}

	//User methods
	updatingUser(value) {
		this.view.updatingUser(value);
	}

	//Post methods
	updatingPost(value) {
		this.view.updatingPost(value);
	}
}
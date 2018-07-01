/**
* @name UsersView
* @extends View
* @file usersView.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class UsersView extends View {

	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
	}

	addUI() {

		this.model = this.app.dataManager.users;

		this.container.className = 'usersContainer';

		this.addBtn = document.createElement('i');
		this.addBtn.innerHTML = 'add';
		this.addBtn.className = 'material-icons';
		this.addBtn.classList.add('addBtn');
		this.addBtn.innerHTML = 'add_circle';
		this.addBtn.onclick = this.addBtnClick.bind(this);

		if (this.app.dataManager.user.isAdmin) {
			this.container.appendChild(this.addBtn);
		}

		this.addUserUI = new AddUserUI(null, this.container, this.app);

		this.addUsers(true);
	}

	addUsers(isShowingUsersForRoom) {
		this.model.forEach(user => {
			var userUI = new UserUI(user, this.container, this.app);
		});
	}

	addBtnClick(e) {
		this.addUserUI.show();
	}

	updatingUser(value) {
		this.addUserUI.updatingUser(value);
	}

}
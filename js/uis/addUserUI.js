/**
* @name AddUserUI
* @extends View
* @file addUserUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class AddUserUI extends View {
	constructor(model, parent, app) {
		super(model, parent, app);
		this.user = null;
		this.addUI();
		this.hide();
	}

	addUI() {
		this.container.className = 'addUserContainer';
		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.nameTxt = document.createElement('input');
		this.lastNameTxt = document.createElement('input');
		this.userNameTxt = document.createElement('input');
		this.passwordTxt = document.createElement('input');
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.nameTxt);
		this.top.appendChild(this.lastNameTxt);
		this.top.appendChild(this.userNameTxt);
		this.top.appendChild(this.passwordTxt);
		this.bottom.appendChild(this.okBtn);
		this.bottom.appendChild(this.cancelBtn);

		this.nameTxt.placeholder = 'Name';
		this.lastNameTxt.placeholder = 'Last Name';
		this.userNameTxt.placeholder = 'Username';
		this.passwordTxt.placeholder = 'Password';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'CANCEL';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);
	}

	okBtnClick(e) {
		if (this.nameTxt.value === '' || this.lastNameTxt.value === '' || this.userNameTxt.value === '' || this.passwordTxt.value === '') {
			alert('Oops, forgot to enter information?')
		} else {
			if (this.user) {
				this.user.name = this.nameTxt.value;
				this.user.lastName = this.lastNameTxt.value;
				this.user.userName = this.userNameTxt.value;
				this.user.password = this.passwordTxt.value;
				// this.app.dataManager.updateUser(this.user);
				this.app.navManager.refresh();
				this.user = null;
			} else {
				var user = new User(this.nameTxt.value, this.lastNameTxt.value, this.userNameTxt.value, this.passwordTxt.value);
				this.app.dataManager.addUser(user);
				this.app.navManager.refresh();
				this.user = null;
			}
		}
	}

	cancelBtnClick(e) {
		this.hide();
		this.user = null;
		this.nameTxt.value = '';
		this.lastNameTxt.value = '';
		this.userNameTxt.value = '';
		this.passwordTxt.value = '';
	}

	updatingUser(value) {
		this.show();
		this.user = value;
		this.nameTxt.value = this.user.name;
		this.lastNameTxt.value = this.user.lastName;
		this.userNameTxt.value = this.user.userName;
		this.passwordTxt.value = this.user.password;
	}

	//Override methods
	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}

}
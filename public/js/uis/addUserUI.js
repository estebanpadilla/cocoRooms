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
		this.addUI();
		this.hide();
	}

	addUI() {
		this.container.className = 'addUserContainer';
		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.nameTxt = document.createElement('input');
		this.lastNameTxt = document.createElement('input');
		this.emailTxt = document.createElement('input');
		this.isAdminChk = document.createElement('input');
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.nameTxt);
		this.top.appendChild(this.lastNameTxt);
		this.top.appendChild(this.emailTxt);
		this.top.appendChild(this.isAdminChk);
		this.bottom.appendChild(this.okBtn);
		this.bottom.appendChild(this.cancelBtn);

		this.nameTxt.placeholder = 'Name';
		this.lastNameTxt.placeholder = 'Last Name';
		this.emailTxt.placeholder = 'Email';
		this.isAdminChk.type = 'checkbox';

		this.nameTxt.type = 'text';
		this.lastNameTxt.type = 'text';
		this.emailTxt.type = 'email';

		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'CANCEL';

		this.nameTxt.className = 'addUser_name';
		this.lastNameTxt.className = 'addUser_lastName';
		this.emailTxt.className = 'addUser_email';

		this.okBtn.className = 'okBtn';
		this.cancelBtn.className = 'cancelBtn';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);
	}

	okBtnClick(e) {
		if (this.nameTxt.value === '' || this.lastNameTxt.value === '' || this.emailTxt.value === '') {
			alert('Oops, forgot to enter information?')
		} else {
			if (this.model) {
				this.model.name = this.nameTxt.value;
				this.model.lastName = this.lastNameTxt.value;
				this.model.userName = this.emailTxt.value;
				this.app.dataManager.updateUser(this.model);
				this.model = null;
			} else {
				this.model = new User(null, this.nameTxt.value, this.lastNameTxt.value, this.emailTxt.value, '', this.isAdminChk.checked);
				this.app.dataManager.addUser(this.model);
				this.model = null;
			}
		}
	}

	cancelBtnClick(e) {
		this.hide();
		this.model = null;
		this.nameTxt.value = '';
		this.lastNameTxt.value = '';
		this.emailTxt.value = '';
	}

	updatingUser(value) {
		this.show();
		this.model = value;
		this.nameTxt.value = this.model.name;
		this.lastNameTxt.value = this.model.lastName;
		this.emailTxt.value = this.model.userName;
	}

	//Override methods
	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}

}
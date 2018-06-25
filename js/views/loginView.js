/**
* @name LoginView
* @extends View
* @file loginView.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class LoginView extends View {

	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
	}

	addUI() {
		this.userNameTxt = document.createElement('input');
		this.passwordTxt = document.createElement('input');
		this.loginBtn = document.createElement('button');

		this.container.appendChild(this.userNameTxt);
		this.container.appendChild(this.passwordTxt);
		this.container.appendChild(this.loginBtn);

		this.userNameTxt.placeholder = 'Username';
		this.passwordTxt.placeholder = 'Password';
		this.passwordTxt.type = 'password';
		this.loginBtn.innerText = 'LOGIN';

		this.loginBtn.onclick = this.loginBtnClick.bind(this);
	}

	loginBtnClick(e) {
		if (this.app.dataManager.validateUser(this.userNameTxt.value, this.passwordTxt.value)) {
			this.app.navManager.goto('rooms');
		}
	}
}